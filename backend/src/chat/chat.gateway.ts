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

@WebSocketGateway({
  cors: {
    origin: [
      'http://localhost:3000',
      'https://guitar-lessons-i99p.onrender.com',
    ],
    credentials: true,
  },
  transports: ['websocket'],
})
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
      const token = client.handshake.auth.token as string;
      if (!token) {
        throw new Error('Token is missing');
      }

      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      client.data.userId = payload.sub;
      client.data.role = payload.role;

      console.log(
        'Client connected:',
        client.id,
        'UserID:',
        client.data.userId,
        'Role:',
        client.data.role,
      );
    } catch (error) {
      console.error('Connection Unauthorized:', error.message);
      client.disconnect();
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
      const senderRole = client.data.role;
      if (!senderId || !senderRole) {
        throw new Error('User not authenticated');
      }

      const message = await this.chatService.sendMessage(
        senderId,
        payload.receiverId,
        payload.content,
      );
      const receiverSocket = this.getSocketByUserId(payload.receiverId);
      if (receiverSocket) {
        const receiverRole = receiverSocket.data.role;

        if (senderRole !== 'admin' && receiverRole !== 'admin') {
          throw new Error(
            'Users can only communicate with admin, not with each other',
          );
        }

        receiverSocket.emit('newMessage', message);
      } else {
        console.log('Receiver is not connected');
      }

      client.emit('newMessage', message);
    } catch (error) {
      console.error('Error handling message:', error.message);
    }
  }

  getSocketByUserId(userId: number): Socket | undefined {
    for (const [, socket] of this.server.sockets.sockets) {
      if (socket.data.userId === userId) {
        return socket;
      }
    }
    return undefined;
  }
}
