import { Global, Module } from '@nestjs/common';
import { AppConfig } from './config.type';

@Global()
@Module({
  providers: [
    {
      provide: AppConfig,
      useFactory: () => {
        return AppConfig.load();
      },
    },
  ],
  exports: [AppConfig],
})
export class AppConfigModule {}
