import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { Message } from '../chat/entities/message.entity'; // Добавьте импорт Message

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Здесь не нужно хэшировать пароль снова, он уже захэширован в register
    const user = this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      username: createUserDto.username,
      password: createUserDto.password, // Захэшированный пароль уже передается
      role: createUserDto.role, // Добавляем роль для сохранения в базу данных
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

  // async deleteUser(id: number): Promise<void> {
  //   await this.userRepository.delete(id);
  // }
  // async deleteUser(id: number): Promise<void> {
  //   const user = await this.userRepository.findOneBy({ id });
  //   if (!user) {
  //     throw new NotFoundException(`User with ID ${id} not found`);
  //   }

  //   try {
  //     await this.userRepository.delete(id);
  //   } catch (error) {
  //     console.error(`Error deleting user with ID ${id}:`, error);
  //     throw new InternalServerErrorException('Error deleting user');
  //   }
  // }
  // Метод для удаления сообщений пользователя
  async deleteUserMessages(userId: number): Promise<void> {
    console.log(`Deleting messages for user ID: ${userId}`);

    // Удаляем все сообщения, где пользователь является отправителем или получателем
    await this.messageRepository
      .createQueryBuilder()
      .delete()
      .from(Message) // Указываем, что удаляем из таблицы сообщений
      .where('senderId = :userId OR receiverId = :userId', { userId }) // Убираем 'message.'
      .execute();

    console.log(`Messages for user ID: ${userId} deleted successfully`);
  }

  // Метод для удаления сессий пользователя
  async deleteUserSessions(userId: number): Promise<void> {
    console.log(`Deleting sessions for user ID: ${userId}`);

    // Удаляем все сессии пользователя
    await this.userRepository.manager.query(
      'DELETE FROM "session" WHERE "userId" = $1',
      [userId],
    );

    console.log(`Sessions for user ID: ${userId} deleted successfully`);
  }

  // Метод для удаления пользователя
  async deleteUser(id: number): Promise<void> {
    console.log(`Deleting user with ID: ${id}`);

    // Удаляем сообщения пользователя
    await this.deleteUserMessages(id);

    // Удаляем сессии пользователя
    await this.deleteUserSessions(id);

    // Удаляем самого пользователя
    await this.userRepository.delete(id);

    console.log(`User with ID: ${id} deleted successfully`);
  }
}
