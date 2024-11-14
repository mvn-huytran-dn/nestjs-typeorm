import { JWT_USER_ACCESS_TOKEN_STRATEGY } from '@app/gateway/auth/auth.constant';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtUserAccessTokenGuard extends AuthGuard(
  JWT_USER_ACCESS_TOKEN_STRATEGY,
) {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const accessToken = request.headers['access-token'];

    if (!accessToken) {
      return true;
    }

    return super.canActivate(context);
  }
}
