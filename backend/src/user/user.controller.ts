import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Req,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Защита маршрутов с помощью JWT аутентификации
import { RolesGuard } from '../auth/guards/roles.guard'; // Импортируем RolesGuard
import { Role } from '../auth/decorators/roles.decorator'; // Импортируем Role декоратор
import { Message } from 'src/chat/entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin') // Только администраторы могут видеть всех пользователей
  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard) // Доступ только авторизованным пользователям
  @Get(':id')
  async getUserById(
    @Param('id') id: number,
    @Req() req: Request,
  ): Promise<User> {
    const user = req.user;

    // Проверяем, если текущий пользователь - администратор или запрашивает свои данные
    if (user.role !== 'admin' && user.id !== id) {
      throw new ForbiddenException(
        'Access denied. You can only view your own data.',
      );
    }

    return await this.userService.findById(id);
  }

  @UseGuards(JwtAuthGuard) // Доступ только авторизованным пользователям
  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateData: Partial<User>,
    @Req() req: Request,
  ): Promise<User> {
    const user = req.user;

    // Проверяем, если текущий пользователь - администратор или запрашивает изменение своих данных
    if (user.role !== 'admin' && user.id !== id) {
      throw new ForbiddenException(
        'Access denied. You can only update your own data.',
      );
    }

    return await this.userService.updateUser(id, updateData);
  }

  @UseGuards(JwtAuthGuard, RolesGuard) // Ограничиваем удаление пользователей
  @Role('admin') // Только администратор может удалять пользователей
  // @Delete(':id')
  // async deleteUser(@Param('id') id: number): Promise<void> {
  //   return await this.userService.deleteUser(id);
  // }
  //   @UseGuards(JwtAuthGuard, RolesGuard)
  //   @Role('admin')
  //   @Delete(':id')
  //   async deleteUser(
  //     @Param('id') id: string,
  //     @Req() req: Request,
  //   ): Promise<void> {
  //     console.log(
  //       `User with role ${req.user.role} is attempting to delete user with ID: ${id}`,
  //     );

  //     const numericId = parseInt(id, 10);
  //     if (isNaN(numericId)) {
  //       throw new BadRequestException('Invalid user ID');
  //     }

  //     console.log(`Parsed ID: ${numericId}`);
  //     return await this.userService.deleteUser(numericId);
  //   }
  // }
  //   @UseGuards(JwtAuthGuard, RolesGuard)
  //   @Role('admin')
  //   @Delete(':id')
  //   async deleteUser(
  //     @Param('id') id: string,
  //     @Req() req: Request,
  //   ): Promise<void> {
  //     console.log(
  //       `User with role ${req.user.role} is attempting to delete user with ID: ${id}`,
  //     );

  //     const numericId = parseInt(id, 10);
  //     if (isNaN(numericId)) {
  //       throw new BadRequestException('Invalid user ID');
  //     }

  //     // Удаление пользователя без проверки на наличие сообщений
  //     console.log(`Parsed ID: ${numericId}`);
  //     return await this.userService.deleteUser(numericId);
  //   }
  // }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<void> {
    console.log(
      `User with role ${req.user.role} is attempting to delete user with ID: ${id}`,
    );

    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid user ID');
    }

    console.log(`Parsed ID: ${numericId}`);
    await this.userService.deleteUser(numericId);
  }
}
