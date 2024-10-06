import { Module } from '@nestjs/common';
import { SourcesController } from './sources.controller';
import { SourcesService } from './sources.service';
import { SourceEntity } from './entities/source.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SourceEntity])],
  controllers: [SourcesController],
  providers: [SourcesService],
})
export class SourcesModule {}
