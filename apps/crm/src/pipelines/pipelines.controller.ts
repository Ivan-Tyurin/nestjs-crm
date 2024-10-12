import { Body, Controller, Get, Post } from '@nestjs/common';
import { PipelinesService } from './pipelines.service';
import { CreatePipelineDto } from '@app/contracts/pipelines/create-pipeline.dto';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PipelineEntity } from './entities/pipeline.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Pipelines')
@Controller('pipelines')
export class PipelinesController {
  constructor(private pipelinesService: PipelinesService) {}

  // /** Получение всех воронок */
  // @Get()
  // findAll(@User('accountId') accountId: number): Promise<PipelineEntity[]> {
  //   return this.pipelinesService.getAll({ accountId });
  // }

  /** Создание новой воронки */
  @EventPattern('create-pipeline')
  create(createPipelineDto: CreatePipelineDto) {
    return this.pipelinesService.create(createPipelineDto);
  }

  /** Удаление воронки по ID */
  @EventPattern('remove-pipeline-by-id')
  removeById(pipelineId: number) {
    return this.pipelinesService.removeById(pipelineId);
  }

  /** Удаление воронок по ID аккаунта */
  @EventPattern('remove-pipeline-by-account-id')
  removeByAccountId(accountId: number) {
    return this.pipelinesService.remove({ accountId });
  }
}
