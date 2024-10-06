import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getPostgresConfig } from './configs/postgres.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AccountsModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
