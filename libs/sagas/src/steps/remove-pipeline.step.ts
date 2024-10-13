import { IPipeline } from '@app/interfaces';
import { SagaStep } from '../interfaces/saga-step.interface';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

export class RemovePipelineStep implements SagaStep<number, boolean> {
  public pipeline: IPipeline;
  constructor(private crmProxy: ClientProxy) {}

  start(accountId: number): Promise<boolean> {
    return firstValueFrom(
      this.crmProxy.send('remove-pipeline-by-account-id', accountId),
    );
  }

  cancel(): Promise<void> {
    throw new Error('The deletion cannot be undone');
  }
}
