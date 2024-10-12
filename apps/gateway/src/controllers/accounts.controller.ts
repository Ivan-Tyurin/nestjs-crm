import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { IAccount, IUser } from '@app/interfaces';
import { CreateAccountDto, RegisterAccountDto } from '@app/contracts';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { CreatePipelineDto } from '@app/contracts/pipelines/create-pipeline.dto';
import { RegisterAccountSaga } from '@app/sagas/register-account.saga';
import { RemoveAccountSaga } from '@app/sagas/remove-account.saga';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(
    @Inject('ACCOUNTS_SERVICE') private accountProxy: ClientProxy,
    @Inject('CRM_SERVICE') private crmProxy: ClientProxy,
    private registerAccountSaga: RegisterAccountSaga,
    private removeAccountSaga: RemoveAccountSaga,
  ) {}

  /** Регистрация нового аккаунта */
  @Post('register')
  async register(
    @Body() registerAccountDto: RegisterAccountDto,
  ): Promise<IAccount> {
    return this.registerAccountSaga.exec(registerAccountDto);
  }

  /** Получение аккаунта по ID */
  @Get(':accountId')
  findById(
    @Param('accountId', ParseIntPipe) accountId: number,
  ): Observable<IAccount> {
    return this.accountProxy.send('find-account-by-id', accountId);
  }

  /** Получения пользователей аккаунта по ID */
  @Get(':accountId/users')
  findUsersByAccountId(
    @Param('accountId', ParseIntPipe) accountId: number,
  ): Observable<IUser[]> {
    return this.accountProxy.send('find-users-by-accounts-id', accountId);
  }

  /** Удаление аккаунта по ID */
  @Delete(':accountId')
  async remove(
    @Param('accountId', ParseIntPipe) accountId: number,
  ): Promise<void> {
    this.removeAccountSaga.exec(accountId);
  }
}
