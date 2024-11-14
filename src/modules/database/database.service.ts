import { LoggerFactoryWrapper } from '@app/core/logger/logger-factory.instance';
import { LoggerFactoryService } from '@app/core/logger/logger-factory.service';
import { LoggerService } from '@app/core/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class DatabaseService {
  private readonly logger: LoggerService;
  constructor(
    loggerFactory: LoggerFactoryService,
    private readonly dataSource: DataSource,
  ) {
    this.logger = loggerFactory.createLogger(DatabaseService.name);
  }

  async handleTransaction(
    callback: (queryRunner: QueryRunner) => Promise<any>,
    queryRunnerOverride?: QueryRunner,
  ) {
    const queryRunner =
      queryRunnerOverride || this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await callback(queryRunner);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.critical('[DatabaseService] handleTransaction error', error);
      throw error;
    } finally {
      this.logger.info('[DatabaseService] handleTransaction finally');
      await queryRunner.release();
    }
  }
}
