import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RemoveAccountStep, RemovePipelineStep } from './steps';

@Injectable()
export class RemoveAccountSaga {
  private removeAccountStep: RemoveAccountStep;
  private removePipelineStep: RemovePipelineStep;

  constructor(
    @Inject('ACCOUNTS_SERVICE') private accountProxy: ClientProxy,
    @Inject('CRM_SERVICE') private crmProxy: ClientProxy,
  ) {
    this.removeAccountStep = new RemoveAccountStep(this.accountProxy);
    this.removePipelineStep = new RemovePipelineStep(this.crmProxy);
  }

  async exec(accountId: number): Promise<boolean> {
    try {
      await Promise.all([
        this.removeAccountStep.start(accountId),
        this.removePipelineStep.start(accountId),
      ]);

      return true;
    } catch (error) {
      throw new BadRequestException('Failed to deletion account');
    }
  }
}
