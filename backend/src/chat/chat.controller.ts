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
// import {
//   Controller,
//   Get,
//   UseGuards,
//   Query,
//   Req,
//   ForbiddenException,
// } from '@nestjs/common';
// import { ChatService } from './chat.service';
// import { Message } from './entities/message.entity';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { RolesGuard } from '../auth/guards/roles.guard';
// import { Role } from '../auth/decorators/roles.decorator';
// import { Request } from 'express';

// @Controller('chat')
// export class ChatController {
//   constructor(private chatService: ChatService) {}

//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Role('admin')
//   @Get('history')
//   async getChatHistory(
//     @Query('user1') userId1: number,
//     @Query('user2') userId2: number,
//     @Req() req: Request,
//   ): Promise<Message[]> {
//     const user = req.user;
//     if (user.role !== 'admin' && user.id !== userId1 && user.id !== userId2) {
//       throw new ForbiddenException(
//         'Access denied. Only admin or participants can view this chat.',
//       );
//     }
//     return await this.chatService.getChatHistory(userId1, userId2);
//   }
// }
