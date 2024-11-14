import { Module } from '@nestjs/common';
import { AppConfigModule } from './modules/config/config.module';
import { LoggerFactoryModule } from '@app/core/logger/logger-factory.module';
import { AppConfig } from './modules/config/config.type';
import { DatabaseModule } from './modules/database/database.module';
import { TestModule } from './modules/test/test.module';
import { AuthModule } from './modules/auth/auth.module';
import { JWTModule } from '@app/core/jwt/jwt.module';
import { UserModule } from './modules/user/user.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';

@Module({
  imports: [
    // Base module
    AppConfigModule,
    LoggerFactoryModule.forRootAsync({
      useFactory: () => AppConfig.load().log,
    }),
    DatabaseModule.registerAsync({
      useFactory: () => AppConfig.load().database,
    }),

    JWTModule,

    // App modules
    TestModule,
    AuthModule,
    UserModule,
    SubscriptionModule,
  ],
})
export class AppModule {}
