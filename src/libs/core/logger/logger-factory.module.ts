import { DynamicModule, Global, Module } from '@nestjs/common';

import { loggerFactoryWrapper } from './logger-factory.instance';
import { LoggerFactoryService } from './logger-factory.service';
import { LoggerServiceOption } from './logger.config';
import {
  DUMP_LOGGER_PROVIDER,
  LOGGER_FACTORY_OPTION as LOGGER_FACTORY_OPTIONS,
} from './logger.constant';
import { DynamicModuleAsyncOptions } from '@app/core/dynamic-module-option';

@Global()
@Module({})
export class LoggerFactoryModule {
  static forRootAsync(
    asyncOptions: DynamicModuleAsyncOptions<LoggerServiceOption>,
  ): DynamicModule {
    return {
      module: LoggerFactoryModule,
      providers: [
        {
          provide: LOGGER_FACTORY_OPTIONS,
          useFactory: asyncOptions.useFactory,
          inject: asyncOptions.inject,
        },
        LoggerFactoryService,
        {
          provide: DUMP_LOGGER_PROVIDER,
          useFactory: (loggerFactory: LoggerFactoryService) => {
            loggerFactoryWrapper.init(loggerFactory);
            return true;
          },
          inject: [LoggerFactoryService],
        },
      ],
      exports: [LoggerFactoryService],
    };
  }
}
