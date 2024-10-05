import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from '@app/contracts';
import { AccountEntity } from '../accounts/entities/account.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    manager?: EntityManager,
  ): Promise<UserEntity> {
    const entityManager = manager ?? this.usersRepository.manager;

    const { accountId, ...userData } = createUserDto;

    const account = await entityManager.findOneBy(AccountEntity, {
      accountId: accountId,
    });

    console.log(account);

    const user = entityManager.create(UserEntity, { ...userData, account });
    return entityManager.save(UserEntity, user);
  }
}
