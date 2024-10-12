import { ConfigService } from '@nestjs/config';
import { ClientProvider, Transport } from '@nestjs/microservices';

export const getAccountsProxy = (
  configService: ConfigService,
): ClientProvider => ({
  transport: Transport.RMQ,
  options: {
    urls: [configService.get<string>('ACCOUNTS_RMQ_URL')],
    queue: configService.get<string>('ACCOUNTS_RMQ_QUEUE'),
    queueOptions: {
      durable: false,
    },
  },
});

export const getCrmProxy = (configService: ConfigService): ClientProvider => ({
  transport: Transport.RMQ,
  options: {
    urls: [configService.get<string>('CRM_RMQ_URL')],
    queue: configService.get<string>('CRM_RMQ_QUEUE'),
    queueOptions: {
      durable: false,
    },
  },
});
