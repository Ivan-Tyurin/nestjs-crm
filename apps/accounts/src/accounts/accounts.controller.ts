import { Body, Controller, Post } from '@nestjs/common';
import { AccountEntity } from './entities/account.entity';
import { AccountsService } from './accounts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateAccountDto } from '@app/contracts';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  /** Регистрация нового аккаунта */
  @Post('/register')
  register(@Body() createAccountDto: CreateAccountDto): Promise<AccountEntity> {
    return this.accountsService.register(createAccountDto);
  }
}
