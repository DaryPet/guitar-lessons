import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity'; // Добавляем импорт User

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private userService: UserService,
  ) {}

  async sendMessage(
    senderId: number,
    receiverId: number,
    content: string,
  ): Promise<Message> {
    const sender = await this.getUserById(senderId);
    const receiver = await this.getUserById(receiverId);

    if (!sender || !receiver) {
      throw new Error('Sender or Receiver not found');
    }

    const newMessage = this.messageRepository.create({
      sender,
      receiver,
      message_content: content,
    });

    return await this.messageRepository.save(newMessage);
  }

  async getChatHistory(userId1: number, userId2: number): Promise<Message[]> {
    return await this.messageRepository.find({
      where: [
        { sender: { id: userId1 }, receiver: { id: userId2 } },
        { sender: { id: userId2 }, receiver: { id: userId1 } },
      ],
      relations: ['sender', 'receiver'],
      order: { timestamp: 'ASC' },
    });
  }

  async getMessagesForUser(userId: number): Promise<Message[]> {
    return await this.messageRepository.find({
      where: [{ sender: { id: userId } }, { receiver: { id: userId } }],
      relations: ['sender', 'receiver'],
      order: { timestamp: 'DESC' },
    });
  }

  async getUserById(userId: number): Promise<User> {
    return await this.userService.findById(userId);
  }
}
