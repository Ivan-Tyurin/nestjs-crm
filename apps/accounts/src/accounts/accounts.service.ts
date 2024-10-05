import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountEntity } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateAccountDto } from '@app/contracts';
import { UsersService } from '../users/users.service';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountsRepository: Repository<AccountEntity>,
    private dataSource: DataSource,
    private usersService: UsersService,
  ) {}

  async register(createAccountDto: CreateAccountDto): Promise<AccountEntity> {
    const { name: accountName, user: createUserDto } = createAccountDto;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const account = queryRunner.manager.create(AccountEntity, {
        name: accountName,
      });
      await queryRunner.manager.save(AccountEntity, account);

      createUserDto.accountId = account.accountId;
      await this.usersService.create(createUserDto, queryRunner.manager); // создание основного пользователя (админа)

      await queryRunner.commitTransaction();

      return account;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Account registration error');
    } finally {
      await queryRunner.release();
    }
  }
}
