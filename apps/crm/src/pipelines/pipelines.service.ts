import { CreatePipelineDto } from '@app/contracts/pipelines/create-pipeline.dto';
import { Injectable } from '@nestjs/common';
import { PipelineEntity } from './entities/pipeline.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class PipelinesService {
  constructor(
    @InjectRepository(PipelineEntity)
    private pipelinesRepository: Repository<PipelineEntity>,
  ) {}

  /** Создание новой воронки */
  create(
    accountId: number,
    createPipelineDto: CreatePipelineDto,
  ): Promise<PipelineEntity> {
    console.log(accountId, createPipelineDto);
    const pipeline = this.pipelinesRepository.create({
      accountId,
      ...createPipelineDto,
    });
    return this.pipelinesRepository.save(pipeline);
  }

  /** Получение всех воронок */
  getAll(where: FindOptionsWhere<PipelineEntity>): Promise<PipelineEntity[]> {
    return this.pipelinesRepository.find();
    // return this.pipelinesRepository.findBy(where);
  }
}
