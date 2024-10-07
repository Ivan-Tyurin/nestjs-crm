import { CreatePipelineDto } from '@app/contracts/pipelines/create-pipeline.dto';
import { Injectable } from '@nestjs/common';
import { PipelineEntity } from './entities/pipeline.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  getAll(): Promise<PipelineEntity[]> {
    return this.pipelinesRepository.find();
  }
}
