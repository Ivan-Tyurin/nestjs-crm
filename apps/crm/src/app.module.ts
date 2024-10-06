import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getPostgresConfig } from './configs/postgres.config';
import { PipelinesModule } from './pipelines/pipelines.module';
import { StatusesModule } from './statuses/statuses.module';
import { SourcesModule } from './sources/sources.module';
import { FieldsModule } from './fields/fields.module';
import { LeadsModule } from './leads/leads.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    PipelinesModule,
    StatusesModule,
    SourcesModule,
    FieldsModule,
    LeadsModule,
    ClientsModule,
  ],
  controllers: [],
})
export class AppModule {}
