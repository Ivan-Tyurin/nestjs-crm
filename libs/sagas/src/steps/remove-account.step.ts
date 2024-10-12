import { IAccount } from '@app/interfaces';
import { SagaStep } from '../interfaces/saga-step.interface';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

export class RemoveAccountStep implements SagaStep<number, boolean> {
  public account: IAccount;
  constructor(private accountProxy: ClientProxy) {}

  start(accountId: number): Promise<boolean> {
    return firstValueFrom(
      this.accountProxy.send('remove-account-by-id', accountId),
    );
  }

  cancel(): Promise<void> {
    throw new Error('The deletion cannot be undone');
  }
}
