import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Message } from '../chat/entities/message.entity'; // Импортируем сущность Message
@Module({
  imports: [TypeOrmModule.forFeature([User, Message])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule], // Экспортируем UserService для использования в AuthModule
})
export class UserModule {}
