import { LoggerFactoryService } from '@app/core/logger/logger-factory.service';
import { LoggerService } from '@app/core/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { query } from 'express';
import { UserService } from '../user/user.service';
import { JWTService } from '@app/core/jwt/jwt.service';
import { AppConfig } from '../config/config.type';
import { UserEntity } from '../database/entities';

@Injectable()
export class AuthService {
  private readonly logger: LoggerService;
  constructor(
    loggerFactory: LoggerFactoryService,
    private readonly databaseSvc: DatabaseService,
    private readonly userSvc: UserService,
    private readonly jwtSvc: JWTService,
    private readonly appConfig: AppConfig,
  ) {
    this.logger = loggerFactory.createLogger(AuthService.name);
  }

  async create(data: {
    email: string;
    password: string;
    fullname: string;
    phone: string;
    birthday: Date;
  }) {
    return this.databaseSvc.handleTransaction(async (queryRunner) => {
      const user = await this.userSvc.createUser(data, { queryRunner });
      const token = await this.generateToken(user);
      return {
        user,
        accessToken: token,
        refreshToken: token,
      };
    });
  }

  async login(data: { phone: string; password: string }) {
    const { phone, password } = data;
    const user = await this.userSvc.validationUserByPhone(phone, password);
    const token = await this.generateToken(user);
    return {
      user,
      accessToken: token,
      refreshToken: token,
    };
  }

  async authorize(userId: number) {
    return this.userSvc.validationUserById(userId);
  }

  private generateToken(user: UserEntity) {
    return this.jwtSvc.signToken(
      { authId: user.id },
      {
        secret: this.appConfig.jwt.userSecretKey,
        expiresIn: this.appConfig.jwt.userExpiresIn,
      },
    );
  }
}
