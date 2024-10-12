import { Controller } from '@nestjs/common';
import { AccountEntity } from './entities/account.entity';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from '@app/contracts';
import { UserEntity } from '../users/entities/user.entity';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  /** Регистрация нового аккаунта */
  @MessagePattern('create-account')
  register(createAccountDto: CreateAccountDto): Promise<AccountEntity> {
    return this.accountsService.register(createAccountDto);
  }

  /** Удаление аккаунта по ID */
  @MessagePattern('remove-account-by-id')
  removeById(accountId: number): Promise<boolean> {
    return this.accountsService.removeById(accountId);
  }

  /** Получение аккаунта по ID */
  @MessagePattern('find-account-by-id')
  findById(accountId: number): Promise<AccountEntity> {
    return this.accountsService.findById(accountId);
  }

  /** Получения пользователей аккаунта по ID */
  @MessagePattern('find-users-by-accounts-id')
  findUsersByAccountId(accountId: number): Promise<UserEntity[]> {
    return this.accountsService.findUsersByAccountId(accountId);
  }
}
