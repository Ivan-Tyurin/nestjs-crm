import { Body, Controller, Get, Post } from '@nestjs/common';
import { PipelinesService } from './pipelines.service';
import { Public, User } from '@app/decorators';
import { CreatePipelineDto } from '@app/contracts/pipelines/create-pipeline.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PipelineEntity } from './entities/pipeline.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Pipelines')
@Controller('pipelines')
export class PipelinesController {
  constructor(private pipelinesService: PipelinesService) {}

  /** Создание новой воронки */
  @Post()
  create(
    @User('accountId') accountId: number,
    @Body() createPipelineDto: CreatePipelineDto,
  ): Promise<CreatePipelineDto> {
    return this.pipelinesService.create(accountId, createPipelineDto);
  }

  /** Получение всех воронок */
  @Get()
  findAll(@User('accountId') accountId: number): Promise<PipelineEntity[]> {
    return this.pipelinesService.getAll({ accountId });
  }

  /** Создание новой воронки через сторонний микросервис */
  @Public()
  @MessagePattern({ cmd: 'create-pipeline' })
  handlerCreate(
    @Payload()
    {
      accountId,
      createPipelineDto,
    }: {
      accountId: number;
      createPipelineDto: CreatePipelineDto;
    },
  ) {
    return this.pipelinesService.create(accountId, createPipelineDto);
  }
}
