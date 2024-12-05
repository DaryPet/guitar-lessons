// import { Controller, Get, Query } from '@nestjs/common';
// import { ChatService } from './chat.service';
// import { Message } from './entities/message.entity';

// @Controller('chat')
// export class ChatController {
//   constructor(private chatService: ChatService) {}

//   @Get('history')
//   async getChatHistory(
//     @Query('user1') userId1: number,
//     @Query('user2') userId2: number,
//   ): Promise<Message[]> {
//     return await this.chatService.getChatHistory(userId1, userId2);
//   }
// }
import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { Message } from './entities/message.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Предположительно ваш guard для проверки JWT
import { Request } from 'express';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  // Эндпоинт для получения истории чата между двумя пользователями
  @UseGuards(JwtAuthGuard) // Защита с помощью JWT (доступен только для залогиненных пользователей)
  @Get('history')
  async getChatHistory(
    @Query('user1') userId1: number,
    @Query('user2') userId2: number,
    @Req() request: Request, // Информация о текущем пользователе из JWT
  ): Promise<Message[]> {
    const currentUser = request.user as any; // Извлечение текущего пользователя
    if (
      currentUser.role !== 'admin' &&
      currentUser.id !== userId1 &&
      currentUser.id !== userId2
    ) {
      throw new Error('Unauthorized access to chat history');
    }
    return await this.chatService.getChatHistory(userId1, userId2);
  }

  // Эндпоинт для отправки сообщения (отправка доступна только для зарегистрированных пользователей и админа)
  @UseGuards(JwtAuthGuard) // Защита с помощью JWT (доступен только для залогиненных пользователей)
  @Post('send')
  async sendMessage(
    @Body() payload: { receiverId: number; content: string },
    @Req() request: Request,
  ): Promise<Message> {
    const currentUser = request.user as any;
    const senderId = currentUser.id;

    if (!senderId || !payload.receiverId || !payload.content) {
      throw new Error('Invalid data provided');
    }

    if (currentUser.role !== 'admin') {
      const receiver = await this.chatService.getUserById(payload.receiverId);
      if (receiver.role !== 'admin') {
        throw new Error('Users can only communicate with admin');
      }
    }

    return await this.chatService.sendMessage(
      senderId,
      payload.receiverId,
      payload.content,
    );
  }
}
