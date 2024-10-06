import { Module } from '@nestjs/common';
import { PipelinesService } from './pipelines.service';
import { PipelinesController } from './pipelines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PipelineEntity } from './entities/pipeline.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PipelineEntity])],
  providers: [PipelinesService],
  controllers: [PipelinesController],
})
export class PipelinesModule {}
