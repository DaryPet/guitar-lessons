import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { UserModule } from '../user/user.module';
import { Message } from './entities/message.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ChatController } from './chat.controller';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Message]),
    JwtModule.register({}),
    ConfigModule,
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  exports: [ChatService],
})
export class ChatModule {}
