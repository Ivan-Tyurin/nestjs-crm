import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import {
  AccountsController,
  AuthController,
  PipelinesController,
  UsersController,
} from './controllers';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from '@app/guards';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getAccountsProxy, getCrmProxy } from './configs/rabbitmq.config';
import { RegisterAccountSaga, RemoveAccountSaga } from '@app/sagas';

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
