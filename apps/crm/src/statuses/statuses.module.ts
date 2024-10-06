import { Module } from '@nestjs/common';
import { StatusesController } from './statuses.controller';
import { StatusesService } from './statuses.service';
import { StatusEntity } from './entities/status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StatusEntity])],
  controllers: [StatusesController],
  providers: [StatusesService],
})
export class StatusesModule {}
