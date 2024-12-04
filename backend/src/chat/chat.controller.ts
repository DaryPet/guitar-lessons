import { Controller, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Message } from './entities/message.entity';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('history')
  async getChatHistory(
    @Query('user1') userId1: number,
    @Query('user2') userId2: number,
  ): Promise<Message[]> {
    return await this.chatService.getChatHistory(userId1, userId2);
  }
}
