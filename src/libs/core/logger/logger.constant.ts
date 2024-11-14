import { LoggerServiceOption } from '../logger/logger.config';

export const LOGGER_FACTORY_OPTION = 'LOGGER_FACTORY_OPTION';

export const GcloudLoggingLevel = {
  critical: 0,
  warning: 1,
  error: 2,
  info: 3,
  debug: 4,
};

export const DEFAULT_OPTIONS: LoggerServiceOption = {
  consoleLevel: 'info',
  consoleJSONFormat: true,
};

export const DUMP_LOGGER_PROVIDER = 'DUMP_LOGGER_PROVIDER';
