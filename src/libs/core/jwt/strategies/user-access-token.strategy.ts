import { LoggerFactoryService } from '@app/core/logger/logger-factory.service';
import { LoggerService } from '@app/core/logger/logger.service';
import { JWT_USER_ACCESS_TOKEN_STRATEGY } from '@app/gateway/auth/auth.constant';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { UserEntity } from 'src/modules/database/entities';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JwtUserAccessTokenStrategy extends PassportStrategy(
  Strategy,
  JWT_USER_ACCESS_TOKEN_STRATEGY,
) {
  private readonly logger: LoggerService;

  constructor(
    private readonly userSvc: UserService,
    loggerFactory: LoggerFactoryService,
  ) {
    super();
    this.logger = loggerFactory.createLogger(JwtUserAccessTokenStrategy.name);
  }

  async validate(request: Request): Promise<UserEntity | null> {
    const accessToken = request.headers['access-token'];

    if (accessToken) {
      try {
        const user =
          await this.userSvc.validationUserByAccessToken(accessToken);
        return user;
      } catch (error) {
        this.logger.error('Failed to validate user by access token', {
          error,
          accessToken,
        });
      }
    }

    return null;
  }
}
