import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from '../src/accounts/accounts.service';
import { UsersService } from '../src/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccountEntity } from '../src/accounts/entities/account.entity';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../src/users/entities/user.entity';
import { TransactionService } from '@app/services';

describe('AccountsService', () => {
  let accountsService: AccountsService;
  let usersService: UsersService;
  let repository: Repository<AccountEntity>;
  let transactionService: TransactionService;

  const mockAccount: AccountEntity = {
    accountId: 1,
    name: 'Test Account',
  };

  const mockUsers: UserEntity[] = [
    {
      userId: 1,
      role: 'admin',
      name: 'Test User 1',
      email: 'test1@example.com',
      password: 'password1',
      account: mockAccount,
    },
    {
      userId: 2,
      role: 'user',
      name: 'Test User 2',
      email: 'test2@example.com',
      password: 'password2',
      account: mockAccount,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(AccountEntity),
          useClass: Repository,
        },
        {
          provide: TransactionService,
          useValue: {
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    accountsService = module.get<AccountsService>(AccountsService);
    usersService = module.get<UsersService>(UsersService);
    repository = module.get<Repository<AccountEntity>>(
      getRepositoryToken(AccountEntity),
    );
    transactionService = module.get<TransactionService>(TransactionService);
  });

  it('register', async () => {
    jest.spyOn(transactionService, 'exec').mockResolvedValue(mockAccount);

    const result = await accountsService.register({
      name: 'Test Account',
      user: {
        role: 'admin',
        name: 'Test User',
        email: 'mail@mail.ru',
        password: '123',
      },
    });

    expect(result).toEqual(mockAccount);
  });

  it('findById', async () => {
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockAccount);

    const result = await accountsService.findById(1);

    expect(result).toEqual({
      accountId: 1,
      name: 'Test Account',
    });
  });

  it('findById', async () => {
    jest.spyOn(accountsService, 'findById').mockResolvedValue(mockAccount);
    jest.spyOn(usersService, 'findAll').mockResolvedValue(mockUsers);

    const result = await accountsService.findUsersByAccountId(1);

    expect(result).toEqual(mockUsers);
  });

  it('removeById', async () => {
    jest.spyOn(accountsService, 'findById').mockResolvedValue(mockAccount);
    jest.spyOn(repository, 'remove').mockResolvedValue(mockAccount);

    const result = await accountsService.removeById(1);
    expect(result).toBeTruthy();
  });
});
