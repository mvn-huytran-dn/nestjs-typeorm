import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWTService } from './jwt.service';
import { JwtAdminStrategy } from './strategies/jwt-admin.strategy';
import { JwtUserStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/database/entities';
import { AppConfig } from 'src/modules/config/config.type';
import { JwtUserAccessTokenStrategy } from './strategies/user-access-token.strategy';
import { UserModule } from 'src/modules/user/user.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
    JwtModule.registerAsync({
      useFactory: (config: AppConfig) => ({
        secret: config.jwt.userSecretKey,
        signOptions: { expiresIn: config.jwt.userExpiresIn },
      }),
      inject: [AppConfig],
    }),
  ],
  providers: [
    JWTService,
    JwtAdminStrategy,
    JwtUserStrategy,
    JwtUserAccessTokenStrategy,
  ],
  exports: [
    JWTService,
    JwtAdminStrategy,
    JwtUserStrategy,
    JwtUserAccessTokenStrategy,
  ],
})
export class JWTModule {}
