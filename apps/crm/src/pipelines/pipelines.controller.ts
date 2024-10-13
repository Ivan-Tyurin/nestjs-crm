import { Body, Controller, Get, Post } from '@nestjs/common';
import { PipelinesService } from './pipelines.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PipelineEntity } from './entities/pipeline.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreatePipelineDto } from '@app/contracts';

@ApiTags('Pipelines')
@Controller('pipelines')
export class PipelinesController {
  constructor(private pipelinesService: PipelinesService) {}

  /** Создание новой воронки */
  @EventPattern('create-pipeline')
  create(createPipelineDto: CreatePipelineDto) {
    return this.pipelinesService.create(createPipelineDto);
  }

  /** Удаление воронки по ID */
  @EventPattern('remove-pipeline-by-id')
  removeById(pipelineId: number): Promise<boolean> {
    return this.pipelinesService.removeById(pipelineId);
  }

  /** Удаление воронок по ID аккаунта */
  @EventPattern('remove-pipeline-by-account-id')
  removeByAccountId(accountId: number): Promise<boolean> {
    return this.pipelinesService.remove({ accountId });
  }
}
