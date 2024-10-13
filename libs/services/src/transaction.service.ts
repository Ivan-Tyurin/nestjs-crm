import { DataSource, QueryRunner } from 'typeorm';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class TransactionService {
  constructor(private readonly dataSource: DataSource) {}

  async exec<T>(work: (queryRunner: QueryRunner) => Promise<T>): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await work(queryRunner);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Transaction failed');
    } finally {
      await queryRunner.release();
    }
  }
}
