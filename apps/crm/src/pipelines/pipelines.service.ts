import { CreatePipelineDto } from '@app/contracts/pipelines/create-pipeline.dto';
import { Injectable } from '@nestjs/common';
import { PipelineEntity } from './entities/pipeline.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAccount } from '@app/interfaces';

@Injectable()
export class PipelinesService {
  constructor(
    @InjectRepository(PipelineEntity)
    private pipelinesRepository: Repository<PipelineEntity>,
  ) {}

  create(
    accountId: number,
    createPipelineDto: CreatePipelineDto,
  ): Promise<PipelineEntity> {
    const pipeline = this.pipelinesRepository.create({
      accountId,
      ...createPipelineDto,
    });
    return this.pipelinesRepository.save(pipeline);
  }
}
