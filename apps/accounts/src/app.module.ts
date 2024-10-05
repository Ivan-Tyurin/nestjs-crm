import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getPostgresConfig } from './configs/postgres.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AccountsModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
  ],
  controllers: [],
})
export class AppModule {}
