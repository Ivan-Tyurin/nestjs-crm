import { CreatePipelineDto } from '@app/contracts/pipelines/create-pipeline.dto';
import { Body, Controller, Delete, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

@ApiTags('Pipelines')
@Controller('pipelines')
export class PipelinesController {
  constructor(@Inject('CRM_SERVICE') private crmProxy: ClientProxy) {}

  /** Создание новой воронки */
  @Post()
  create(@Body() createPipelineDto: CreatePipelineDto) {
    return this.crmProxy.send('create-pipeline', createPipelineDto);
  }

  /** Удаление воронки по ID */
  @Delete(':pipelineId')
  removeById(pipelineId: number): Observable<boolean> {
    return this.crmProxy.send('remove-pipeline-by-id', pipelineId);
  }

  /** Удаление воронок по ID аккаунта */
  removeByAccountId(accountId: number): Observable<boolean> {
    return this.crmProxy.send('remove-pipeline-by-account-id', accountId);
  }
}
