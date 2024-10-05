import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getPostgresConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('ACCOUNTS_DATABASE_HOST'),
  port: configService.get<number>('ACCOUNTS_DATABASE_PORT'),
  username: configService.get<string>('ACCOUNTS_DATABASE_USERNAME'),
  password: configService.get<string>('ACCOUNTS_DATABASE_PASSWORD'),
  database: 'accounts',
  synchronize: true,
  autoLoadEntities: true,
  entities: [],
});
