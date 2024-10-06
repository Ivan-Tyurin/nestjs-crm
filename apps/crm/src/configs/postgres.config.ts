import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getPostgresConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: configService.get<string>('CRM_DATABASE_HOST'),
    port: configService.get<number>('CRM_DATABASE_PORT'),
    username: configService.get<string>('CRM_DATABASE_USERNAME'),
    password: configService.get<string>('CRM_DATABASE_PASSWORD'),
    database: 'crm',
    synchronize: true,
    autoLoadEntities: true,
    entities: [],
  };
};
