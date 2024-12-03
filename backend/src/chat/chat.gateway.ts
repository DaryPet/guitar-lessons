import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  afterInit() {
    console.log('WebSocket Initialized');
  }

  handleConnection(client: Socket) {
    try {
      // Получаем токен из client.auth (вместо handshake.query)
      const token = client.handshake.auth.token as string;
      if (!token) {
        throw new Error('Token is missing');
      }

      // Верифицируем токен и извлекаем информацию о пользователе
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      client.data.userId = payload.sub;

      console.log(
        'Client connected:',
        client.id,
        'UserID:',
        client.data.userId,
      );
    } catch (error) {
      console.error('Connection Unauthorized:', error.message);
      client.disconnect(); // Отключаем неавторизованный клиент
    }
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    payload: { receiverId: number; content: string },
  ) {
    try {
      const senderId = client.data.userId;
      if (!senderId) {
        throw new Error('User not authenticated');
      }

      const message = await this.chatService.sendMessage(
        senderId,
        payload.receiverId,
        payload.content,
      );

      // Отправляем сообщение получателю, если он подключен
      const receiverSocket = this.getSocketByUserId(payload.receiverId);
      if (receiverSocket) {
        receiverSocket.emit('newMessage', message);
      } else {
        console.log('Receiver is not connected');
      }

      // Отправляем сообщение отправителю (чтобы обновить его интерфейс)
      client.emit('newMessage', message);
    } catch (error) {
      console.error('Error handling message:', error);
    }
  }

  // Вспомогательная функция для поиска клиента по userId
  getSocketByUserId(userId: number): Socket | undefined {
    for (const [, socket] of this.server.sockets.sockets) {
      if (socket.data.userId === userId) {
        return socket;
      }
    }
    return undefined;
  }
}
