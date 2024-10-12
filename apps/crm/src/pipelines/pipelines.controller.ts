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

  // /** Создание новой воронки */
  // @Post()
  // create(
  //   @User('accountId') accountId: number,
  //   @Body() createPipelineDto: CreatePipelineDto,
  // ): Promise<CreatePipelineDto> {
  //   return this.pipelinesService.create(accountId, createPipelineDto);
  // }

  // /** Получение всех воронок */
  // @Get()
  // findAll(@User('accountId') accountId: number): Promise<PipelineEntity[]> {
  //   return this.pipelinesService.getAll({ accountId });
  // }

  /** Создание новой воронки */
  @EventPattern('create-pipeline')
  handlerCreate(createPipelineDto: CreatePipelineDto) {
    return this.pipelinesService.create(createPipelineDto);
  }
}
