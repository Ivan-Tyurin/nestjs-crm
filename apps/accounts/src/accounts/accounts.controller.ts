import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AccountEntity } from './entities/account.entity';
import { AccountsService } from './accounts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateAccountDto } from '@app/contracts';
import { UserEntity } from '../users/entities/user.entity';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  /** Регистрация нового аккаунта */
  @Post('register')
  register(@Body() createAccountDto: CreateAccountDto): Promise<AccountEntity> {
    return this.accountsService.register(createAccountDto);
  }

  /** Получение аккаунта по ID */
  @Get(':accountId')
  findById(
    @Param('accountId', ParseIntPipe) accountId: number,
  ): Promise<AccountEntity> {
    return this.accountsService.findById(accountId);
  }

  /** Получения пользователей аккаунта по ID */
  @Get(':accountId/users')
  findUsersByAccountId(
    @Param('accountId', ParseIntPipe) accountId: number,
  ): Promise<UserEntity[]> {
    return this.accountsService.findUsersByAccountId(accountId);
  }
}
