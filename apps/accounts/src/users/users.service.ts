import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import {
  EntityManager,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { CreateUserDto } from '@app/contracts';
import { AccountEntity } from '../accounts/entities/account.entity';
import * as bcrypt from 'bcrypt';

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
    if (!account) throw new NotFoundException('Account not founded');

    userData.password = await bcrypt.hash(userData.password, 10);

    const user = entityManager.create(UserEntity, { ...userData, account });
    return entityManager.save(UserEntity, user);
  }

  async findAll(where: FindOptionsWhere<UserEntity>) {
    const users = await this.usersRepository.findBy(where);
    return users;
  }

  async findOne(
    where: FindOptionsWhere<UserEntity>,
    { relations }: { relations: FindOptionsRelations<UserEntity> },
  ) {
    const user = await this.usersRepository.findOne({ where, relations });
    return user;
  }
}
