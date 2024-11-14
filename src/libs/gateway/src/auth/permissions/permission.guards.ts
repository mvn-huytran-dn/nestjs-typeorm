import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionDeniedException } from '@app/exception/exception';
import { LoggerService } from '@app/core/logger/logger.service';
import { LoggerFactoryService } from '@app/core/logger/logger-factory.service';
import { PERMISSIONS_KEY } from '@app/gateway/auth/permissions/permission.decorator';

@Injectable()
export class AdminPermissionValidationGuards implements CanActivate {
  private readonly logger: LoggerService;
  constructor(
    private reflector: Reflector,
    loggerFactory: LoggerFactoryService,
  ) {
    this.logger = loggerFactory.createLogger(
      AdminPermissionValidationGuards.name,
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermission?.length) {
      return true;
    }

    const resource = requiredPermission[0];

    throw new PermissionDeniedException(
      'You do not have permission to access this resource',
      {
        code: 'PERMISSION_DENIED',
        errorDetails: {
          resource,
        },
      },
    );
  }
}
