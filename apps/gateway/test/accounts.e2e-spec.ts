import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { GatewayModule } from '../src/gateway.module';
import { LoginDto, RegisterAccountDto } from '@app/contracts';
import { IAccount } from '@app/interfaces';

describe('AccountsController (e2e)', () => {
  let app: INestApplication;

  let accessToken: string;
  let account: IAccount;

  const loginDto: LoginDto = {
    email: 'mail@gmail.com',
    password: '123',
  };

  const registerAccountDto: RegisterAccountDto = {
    name: 'Test Account',
    user: {
      role: 'admin',
      name: 'Test User',
      email: 'mail@mail.ru',
      password: '123',
    },
    pipeline: {
      name: 'Test User',
    },
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [GatewayModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/login', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.accessToken).toBeDefined();
        accessToken = body.accessToken;
      });
  });

  it('/accounts/register (POST)', async () => {
    return request(app.getHttpServer())
      .post('/accounts/register')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(registerAccountDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        expect(body).toBeDefined();
        account = body;
        console.log(account);
      });
  });

  it('/accounts/:accountId (DELETE)', async () => {
    return request(app.getHttpServer())
      .delete(`/accounts/${account.accountId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });
});
