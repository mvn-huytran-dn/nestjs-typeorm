import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/modules/database/entities/user.entity';
import { AppConfig } from 'src/modules/config/config.type';

@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy, 'jwt-user') {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {
    const config = AppConfig.load();
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.userSecretKey,
    });
  }

  async validate(payload) {
    const { userId } = payload;
    const foundUser = await this.userRepo.findOneBy({
      id: userId,
    });
    return foundUser ? payload : null;
  }
}
