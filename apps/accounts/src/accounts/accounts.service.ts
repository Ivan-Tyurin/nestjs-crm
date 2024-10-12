import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AccountEntity } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateAccountDto } from '@app/contracts';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountsRepository: Repository<AccountEntity>,
    private dataSource: DataSource,
    private usersService: UsersService,
    @Inject('CRM_SERVICE') private crmClient: ClientProxy,
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
      await queryRunner.manager.save(AccountEntity, account); // создание нового аккаунта

      createUserDto.accountId = account.accountId;
      await this.usersService.create(createUserDto, queryRunner.manager); // создание основного пользователя (админа) для нового аккаунта

      await queryRunner.commitTransaction();

      return account;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Account registration error');
    } finally {
      await queryRunner.release();
    }
  }

  async findById(accountId: number): Promise<AccountEntity> {
    const account = await this.accountsRepository.findOneBy({ accountId });
    if (!account) throw new NotFoundException('Account not founded');

    return account;
  }

  async findUsersByAccountId(accountId: number): Promise<UserEntity[]> {
    const account = await this.findById(accountId);
    const users = await this.usersService.findAll({ account });
    return users;
  }

  async removeById(accountId: number): Promise<boolean> {
    const account = await this.findById(accountId);
    await this.accountsRepository.remove(account);

    return true;
  }
}
