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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Get('history')
  async getChatHistory(
    @Query('user1') userId1: string,
    @Query('user2') userId2: string,
    @Req() request: Request,
  ): Promise<Message[]> {
    const currentUser = request.user as any;

    const user1 = parseInt(userId1, 10);
    const user2 = parseInt(userId2, 10);

    if (
      currentUser.id !== user1 &&
      currentUser.id !== user2 &&
      currentUser.role !== 'admin'
    ) {
      throw new Error('Unauthorized access to chat history');
    }

    return await this.chatService.getChatHistory(user1, user2);
  }

  @UseGuards(JwtAuthGuard)
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
