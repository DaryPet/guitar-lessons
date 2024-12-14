import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { Message } from '../chat/entities/message.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      username: createUserDto.username,
      password: createUserDto.password,
      role: createUserDto.role,
    });
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(userId: number): Promise<User> {
    return await this.userRepository.findOneBy({ id: userId });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async updateUser(id: number, updateData: Partial<User>): Promise<User> {
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }
    await this.userRepository.update(id, updateData);
    return this.findById(id);
  }
  async deleteUserMessages(userId: number): Promise<void> {
    console.log(`Deleting messages for user ID: ${userId}`);
    await this.messageRepository
      .createQueryBuilder()
      .delete()
      .from(Message)
      .where('senderId = :userId OR receiverId = :userId', { userId })
      .execute();

    console.log(`Messages for user ID: ${userId} deleted successfully`);
  }
  async deleteUserSessions(userId: number): Promise<void> {
    console.log(`Deleting sessions for user ID: ${userId}`);

    await this.userRepository.manager.query(
      'DELETE FROM "session" WHERE "userId" = $1',
      [userId],
    );

    console.log(`Sessions for user ID: ${userId} deleted successfully`);
  }

  async deleteUser(id: number): Promise<void> {
    console.log(`Deleting user with ID: ${id}`);

    await this.deleteUserMessages(id);
    await this.deleteUserSessions(id);
    await this.userRepository.delete(id);

    console.log(`User with ID: ${id} deleted successfully`);
  }
}
