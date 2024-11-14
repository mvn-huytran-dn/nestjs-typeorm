import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import {
  SWAGGER_ACCESS_TOKEN_KEY,
  SWAGGER_ADMIN_ACCESS_TOKEN_KEY,
} from '@app/gateway/swagger/swagger.constant';
import { JwtAuthUserGuard } from '@app/core/jwt/guards/jwt-user.guard';
import { JwtAuthAdminGuard } from '@app/core/jwt/guards/jwt-admin.guard';
import { JwtUserAccessTokenGuard } from '@app/core/jwt/guards/jwt-user-access-token.guard';

export function UserRequired() {
  return applyDecorators(
    UseGuards(JwtUserAccessTokenGuard, JwtAuthUserGuard),
    ApiBearerAuth(SWAGGER_ACCESS_TOKEN_KEY),
    ApiHeader({
      name: 'access-token',
      required: false,
    }),
  );
}

export function AdminRequired() {
  return applyDecorators(
    UseGuards(JwtAuthAdminGuard),
    ApiBearerAuth(SWAGGER_ADMIN_ACCESS_TOKEN_KEY),
  );
}
