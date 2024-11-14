import { IS_PUBLIC_KEY } from '@app/gateway/metadata';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthAdminGuard extends AuthGuard('jwt-admin') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();
    const isAuth =
      request.headers['authorization'] || request.headers['Authorization'];
    if (isPublic && !isAuth) return true;
    return super.canActivate(context);
  }
}
