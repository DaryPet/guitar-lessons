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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/decorators/roles.decorator';
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
  @Role('admin')
  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(
    @Param('id') id: number,
    @Req() req: Request,
  ): Promise<User> {
    const user = req.user;

    if (user.role !== 'admin' && user.id !== id) {
      throw new ForbiddenException(
        'Access denied. You can only view your own data.',
      );
    }

    return await this.userService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateData: Partial<User>,
    @Req() req: Request,
  ): Promise<User> {
    const user = req.user;

    if (user.role !== 'admin' && user.id !== id) {
      throw new ForbiddenException(
        'Access denied. You can only update your own data.',
      );
    }

    return await this.userService.updateUser(id, updateData);
  }

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
