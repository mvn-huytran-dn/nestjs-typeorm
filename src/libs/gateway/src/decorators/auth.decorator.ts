import { UnauthenticatedException } from '@app/exception/exception';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthInfo } from '../auth/type';

export const User = createParamDecorator(
  async (data: keyof AuthInfo, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const auth: AuthInfo = request.user;
    return data ? auth?.[data] : auth;
  },
);

export const CurrentUserId = createParamDecorator(
  async (data: keyof AuthInfo, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const auth: AuthInfo = request.user;
    const authId = auth?.authId;
    if (!authId) {
      throw new UnauthenticatedException('Unauthenticated', {
        code: 'UNAUTHENTICATED',
        metadata: {
          context: ctx,
        },
      });
    }

    return authId;
  },
);
