import { LoggerFactoryService } from '@app/core/logger/logger-factory.service';
import { LoggerService } from '@app/core/logger/logger.service';
import { Controller, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CurrentUserId } from '@app/gateway/decorators/auth.decorator';
import { plainToInstance } from 'class-transformer';
import { GenerateAccessTokenResponse } from './dto/response';
import { UserRequired } from '@app/gateway/auth';

@UserRequired()
@ApiTags('[User] User')
@Controller('v1/user')
export class UserController {
  private readonly logger: LoggerService;

  constructor(
    loggerFactory: LoggerFactoryService,
    private readonly svc: UserService,
  ) {
    this.logger = loggerFactory.createLogger(UserController.name);
  }

  @Patch('generate-access-token')
  @ApiOperation({ summary: '[User] Generate access token' })
  @ApiResponse({
    type: GenerateAccessTokenResponse,
  })
  async generateAccessToken(@CurrentUserId() userId: number) {
    const accessToken = await this.svc.updateAccessToken(userId);
    return plainToInstance(GenerateAccessTokenResponse, { accessToken });
  }
}
