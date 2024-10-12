import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AccountsController } from './controllers';
import { RegisterAccountSaga } from '@app/sagas/register-account.saga';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ACCOUNTS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'accounts_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'CRM_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'crm_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AccountsController],
  providers: [
    {
      provide: RegisterAccountSaga,
      useClass: RegisterAccountSaga,
    },
  ],
})
export class GatewayModule {}
