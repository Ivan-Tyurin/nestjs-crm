import { IAccount } from '@app/interfaces';
import { SagaStep } from '../interfaces/saga-step.interface';
import { CreateAccountDto } from '@app/contracts';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

export class CreateAccountStep implements SagaStep<CreateAccountDto, IAccount> {
  public account: IAccount;
  constructor(private accountProxy: ClientProxy) {}

  async start(createAccountDto: CreateAccountDto): Promise<IAccount> {
    this.account = await firstValueFrom(
      this.accountProxy.send('create-account', createAccountDto),
    );

    return this.account;
  }

  async cancel(): Promise<void> {
    if (!this.account) return;

    await firstValueFrom(
      this.accountProxy.send('remove-account-by-id', this.account.accountId),
    );
  }
}
