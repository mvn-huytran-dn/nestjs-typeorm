import { AuthInfo } from '@app/gateway/auth/type';
import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class JWTService {
  constructor(private _jwtService: JwtService) {}

  signToken(payload: AuthInfo, options?: JwtSignOptions) {
    return this._jwtService.signAsync(payload, options);
  }
}
