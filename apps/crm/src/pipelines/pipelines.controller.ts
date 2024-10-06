import { Body, Controller, Post } from '@nestjs/common';
import { PipelinesService } from './pipelines.service';
import { User } from '@app/decorators';
import { IAccount } from '@app/interfaces';
import { CreatePipelineDto } from '@app/contracts/pipelines/create-pipeline.dto';

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
}
