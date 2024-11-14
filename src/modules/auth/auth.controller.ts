import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoggerService } from '@app/core/logger/logger.service';
import { LoggerFactoryService } from '@app/core/logger/logger-factory.service';
import { UserLoginRequest, UserRegisterRequest } from './dto/auth.request';
import {
  UserAuthorizeResponse,
  UserLoginResponse,
  UserRegisterResponse,
} from './dto/auth.response';
import { plainToInstance } from 'class-transformer';
import { CurrentUserId } from '@app/gateway/decorators/auth.decorator';
import { UserRequired } from '@app/gateway/auth';

@ApiTags('Auth')
@Controller('v1/auth')
export class AuthController {
  private readonly logger: LoggerService;

  constructor(
    loggerFactory: LoggerFactoryService,
    private readonly svc: AuthService,
  ) {
    this.logger = loggerFactory.createLogger(AuthController.name);
  }

  @Post('register')
  @ApiOperation({
    summary: '[User] create new account',
  })
  @ApiResponse({
    type: UserRegisterResponse,
  })
  async register(@Body() body: UserRegisterRequest) {
    const result = await this.svc.create(body);
    return plainToInstance(UserRegisterResponse, result);
  }

  @Post('login')
  @ApiOperation({
    summary: '[User] login',
  })
  @ApiResponse({
    type: UserLoginResponse,
  })
  async login(@Body() body: UserLoginRequest) {
    const result = await this.svc.login(body);
    return plainToInstance(UserLoginResponse, result);
  }

  @UserRequired()
  @Get('authorize')
  @ApiOperation({
    summary: '[User] authorize',
  })
  @ApiResponse({
    type: UserAuthorizeResponse,
  })
  async authorize(@CurrentUserId() userId: number) {
    const user = await this.svc.authorize(userId);
    return plainToInstance(UserAuthorizeResponse, { user });
  }
}
