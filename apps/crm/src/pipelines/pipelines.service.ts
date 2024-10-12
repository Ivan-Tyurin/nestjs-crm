import { CreatePipelineDto } from '@app/contracts/pipelines/create-pipeline.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
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
  create(createPipelineDto: CreatePipelineDto): Promise<PipelineEntity> {
    const pipeline = this.pipelinesRepository.create(createPipelineDto);
    return this.pipelinesRepository.save(pipeline);
  }

  /** Получение всех воронок */
  getAll(where: FindOptionsWhere<PipelineEntity>): Promise<PipelineEntity[]> {
    return this.pipelinesRepository.findBy(where);
  }

  async findById(pipelineId: number): Promise<PipelineEntity> {
    const account = await this.pipelinesRepository.findOneBy({ pipelineId });
    if (!account) throw new NotFoundException('Pipeline not founded');

    return account;
  }

  async removeById(pipelineId: number): Promise<boolean> {
    const pipeline = await this.findById(pipelineId);
    await this.pipelinesRepository.remove(pipeline);

    return true;
  }

  async remove(where: FindOptionsWhere<PipelineEntity>): Promise<boolean> {
    const pipelines = await this.getAll(where);
    await this.pipelinesRepository.remove(pipelines);

    return true;
  }
}
