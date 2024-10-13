import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { UsersModule } from '../users/users.module';
import { TransactionService } from '@app/services/transaction.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([AccountEntity])],
  controllers: [AccountsController],
  providers: [AccountsService, TransactionService],
})
export class AccountsModule {}
