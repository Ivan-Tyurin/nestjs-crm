import { Module } from '@nestjs/common';
import {
  ClientProvider,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import {
  AccountsController,
  AuthController,
  PipelinesController,
  UsersController,
} from './controllers';
import { RegisterAccountSaga } from '@app/sagas/register-account.saga';
import { RemoveAccountSaga } from '@app/sagas/remove-account.saga';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from '@app/guards';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getAccountsProxy, getCrmProxy } from './configs/rabbitmq.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: 'ACCOUNTS_SERVICE',
          inject: [ConfigService],
          useFactory: getAccountsProxy,
        },
        {
          name: 'CRM_SERVICE',
          inject: [ConfigService],
          useFactory: getCrmProxy,
        },
      ],
    }),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule,
  ],
  controllers: [
    AuthController,
    AccountsController,
    UsersController,
    PipelinesController,
  ],
  providers: [
    JwtStrategy,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
    RegisterAccountSaga,
    RemoveAccountSaga,
  ],
})
export class GatewayModule {}
