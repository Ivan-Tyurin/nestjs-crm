import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterAccountDto } from '@app/contracts';
import { CreateAccountStep, CreatePipelineStep } from './steps';
import { IAccount } from '@app/interfaces';

@Injectable()
export class RegisterAccountSaga {
  private createAccountStep: CreateAccountStep;
  private createPipelineStep: CreatePipelineStep;

  constructor(
    @Inject('ACCOUNTS_SERVICE') private accountProxy: ClientProxy,
    @Inject('CRM_SERVICE') private crmProxy: ClientProxy,
  ) {
    this.createAccountStep = new CreateAccountStep(this.accountProxy);
    this.createPipelineStep = new CreatePipelineStep(this.crmProxy);
  }

  async exec(registerAccountDto: RegisterAccountDto): Promise<IAccount> {
    try {
      const { pipeline: createPipelineDto, ...createAccountDto } =
        registerAccountDto;

      const account = await this.createAccountStep.start(createAccountDto);

      createPipelineDto.accountId = account.accountId;
      const pipeline = await this.createPipelineStep.start(createPipelineDto);

      return account;
    } catch (error) {
      await Promise.all([
        this.createAccountStep.cancel(),
        this.createPipelineStep.cancel(),
      ]);

      throw new BadRequestException('Failed to register account');
    }
  }
}
