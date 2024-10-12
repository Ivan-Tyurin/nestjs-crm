import { IPipeline } from '@app/interfaces';
import { SagaStep } from '../interfaces/saga-step.interface';
import { CreatePipelineDto } from '@app/contracts/pipelines/create-pipeline.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

export class CreatePipelineStep
  implements SagaStep<CreatePipelineDto, IPipeline>
{
  public pipeline: IPipeline;

  constructor(private crmProxy: ClientProxy) {}

  async start(createPipelineDto: CreatePipelineDto): Promise<IPipeline> {
    this.pipeline = await firstValueFrom(
      this.crmProxy.send('create-pipeline', createPipelineDto),
    );

    return this.pipeline;
  }

  async cancel(): Promise<void> {
    if (!this.pipeline) return;

    await firstValueFrom(
      this.crmProxy.send('remove-pipeline-by-id', this.pipeline.pipelineId),
    );
  }
}
