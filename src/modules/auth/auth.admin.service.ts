import { LoggerFactoryService } from '@app/core/logger/logger-factory.service';
import { LoggerService } from '@app/core/logger/logger.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthAdminService {
  private readonly logger: LoggerService;
  constructor(loggerFactory: LoggerFactoryService) {
    this.logger = loggerFactory.createLogger(AuthAdminService.name);
  }
}
