import { Body, Controller, Get, Post } from '@nestjs/common';
import { PipelinesService } from './pipelines.service';
import { Public, User } from '@app/decorators';
import { CreatePipelineDto } from '@app/contracts/pipelines/create-pipeline.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PipelineEntity } from './entities/pipeline.entity';

@Controller('pipelines')
export class PipelinesController {
  constructor(private pipelinesService: PipelinesService) {}

  @Post()
  create(
    @User('accountId') accountId: number,
    @Body() createPipelineDto: CreatePipelineDto,
  ): Promise<CreatePipelineDto> {
    return this.pipelinesService.create(accountId, createPipelineDto);
  }

  @Public()
  @MessagePattern({ cmd: 'create-pipeline' })
  handlerCreate(
    @Payload()
    payload: {
      accountId: number;
      createPipelineDto: CreatePipelineDto;
    },
  ) {
    return this.pipelinesService.create(
      payload.accountId,
      payload.createPipelineDto,
    );
  }

  @Get()
  findAll(): Promise<PipelineEntity[]> {
    return this.pipelinesService.getAll();
  }
}
