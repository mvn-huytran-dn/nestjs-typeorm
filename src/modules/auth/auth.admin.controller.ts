import { LoggerFactoryService } from '@app/core/logger/logger-factory.service';
import { LoggerService } from '@app/core/logger/logger.service';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthAdminService } from './auth.admin.service';

@ApiTags('[Admin] Auth')
@Controller('admin/v1/auth')
export class AuthAdminController {
  private readonly logger: LoggerService;
  constructor(
    loggerFactory: LoggerFactoryService,
    private readonly svc: AuthAdminService,
  ) {
    this.logger = loggerFactory.createLogger(AuthAdminController.name);
  }
}
