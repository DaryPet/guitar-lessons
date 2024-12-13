import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
  async deleteUser(id: number): Promise<void> {
    console.log(`Deleting sessions for user ID: ${id}`);

    // Удаляем связанные сессии из таблицы `session`
    await this.userRepository.manager.query(
      'DELETE FROM "session" WHERE "userId" = $1',
      [id],
    );

    console.log(`Deleting user with ID: ${id}`);

    // Удаляем пользователя
    await this.userRepository.delete(id);

    console.log(`User with ID: ${id} deleted successfully`);
  }
}
