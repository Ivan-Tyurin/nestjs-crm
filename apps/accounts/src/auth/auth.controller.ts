import {
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '@app/contracts';
import { LocalAuthGuard } from '@app/guards';
import { Public } from '@app/decorators';
import { MessagePattern } from '@nestjs/microservices';
import { UserEntity } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /** Аутентификация пользователя */
  @MessagePattern('auth-login')
  async login(loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto);

    if (!user) throw new UnauthorizedException('Email or password not correct');

    return this.authService.login(user);
  }
}
