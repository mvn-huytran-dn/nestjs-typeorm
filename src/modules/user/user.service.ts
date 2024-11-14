import { LoggerFactoryService } from '@app/core/logger/logger-factory.service';
import { LoggerService } from '@app/core/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { Not, QueryRunner, Repository } from 'typeorm';
import { UserEntity } from '../database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException } from '@app/exception/exception';
import { compareString, hashString, randomString } from '@app/core/utils';
import {
  USER_DEFAULT_ACCESS_TOKEN_LENGTH,
  USER_MAX_RANDOM_ACCESS_TOKEN_RETRIES,
} from './constants';

@Injectable()
export class UserService {
  private readonly logger: LoggerService;
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    loggerFactory: LoggerFactoryService,
  ) {
    this.logger = loggerFactory.createLogger(UserService.name);
  }

  async validationExitsEmail(email: string) {
    const existing = await this.userRepo.count({
      where: { email },
    });

    if (existing > 0) {
      throw new ConflictException('Email already exists', {
        code: 'EMAIL_ALREADY_EXISTS',
        metadata: { email },
        errorDetails: { email },
      });
    }
  }

  async validationExistPhone(phone: string) {
    const existing = await this.userRepo.count({
      where: { phone },
    });

    if (existing > 0) {
      throw new ConflictException('Phone already exists', {
        code: 'PHONE_ALREADY_EXISTS',
        metadata: { phone },
        errorDetails: { phone },
      });
    }
  }

  async createUser(
    data: {
      email: string;
      password: string;
      fullname: string;
      phone: string;
      birthday: Date;
    },
    opts: {
      queryRunner?: QueryRunner;
    } = {},
  ) {
    await this.validationExistPhone(data.phone);
    await this.validationExitsEmail(data.email);

    data.password = hashString(data.password);

    if (opts.queryRunner) {
      return await opts.queryRunner.manager.save(UserEntity, data);
    }

    return await this.userRepo.save(data);
  }

  async validationUserByPhone(phone: string, password: string) {
    const user = await this.userRepo.findOne({
      where: { phone },
    });

    if (!user) {
      throw new ConflictException('User not found', {
        code: 'USER_NOT_FOUND',
        metadata: { phone },
        errorDetails: { phone },
      });
    }

    if (!compareString(password, user.password)) {
      throw new ConflictException('Password not match', {
        code: 'PASSWORD_NOT_MATCH',
      });
    }

    return user;
  }

  async validationUserById(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new ConflictException('User not found', {
        code: 'USER_NOT_FOUND',
        metadata: { id },
        errorDetails: { id },
      });
    }

    return user;
  }

  async updateAccessToken(userId: number) {
    const user = await this.validationUserById(userId);
    return this.generateToken(user);
  }

  async generateToken(user: UserEntity, step: number = 0) {
    if (step >= USER_MAX_RANDOM_ACCESS_TOKEN_RETRIES) {
      throw new ConflictException('Cannot generate access token', {
        code: 'CANNOT_GENERATE_ACCESS_TOKEN',
      });
    }

    const newToken = randomString(USER_DEFAULT_ACCESS_TOKEN_LENGTH);
    const existing = await this.userRepo.count({
      where: {
        accessToken: newToken,
        id: Not(user.id),
      },
    });

    if (existing > 0) {
      return await this.generateToken(user, step++);
    }

    user.accessToken = newToken;
    await this.userRepo.save(user);

    return newToken;
  }

  async validationUserByAccessToken(accessToken: string) {
    const user = await this.userRepo.findOne({
      where: { accessToken },
    });
    if (!user) {
      throw new ConflictException('User not found', {
        code: 'USER_NOT_FOUND',
        metadata: { accessToken },
        errorDetails: { accessToken },
      });
    }

    return user;
  }
}
