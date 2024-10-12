import { CreateUserDto } from '@app/contracts';
import { Body, Controller, Post } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern } from '@nestjs/microservices';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /** Создание нового пользователя */
  @MessagePattern('create-user')
  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }
}
