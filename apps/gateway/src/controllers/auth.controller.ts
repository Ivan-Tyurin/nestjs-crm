import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from '@app/contracts';
import { LocalAuthGuard } from '@app/guards';
import { Public } from '@app/decorators';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(@Inject('ACCOUNTS_SERVICE') private accountsProxy: ClientProxy) {}

  /** Аутентификация пользователя */
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.accountsProxy.send('auth-login', loginDto);
  }
}
