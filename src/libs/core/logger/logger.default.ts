import { LoggerService } from '@nestjs/common';
import 'dotenv/config';
import * as winston from 'winston';
import { Logger } from 'winston';
import { GcloudLoggingLevel } from './logger.constant';
import { plainLogFormat, resolveMetadata, severityFormat } from './logger.util';
import { logEmitter } from '../log-emitter';

const DEFAULT_LOG_OPT = {
  logLevel: 'info',
  enableJsonFormat: 'true',
};

class DefaultLoggerService {
  private readonly logger: Logger;

  constructor() {
    this.logger = winston.createLogger({
      levels: GcloudLoggingLevel,
      level: DEFAULT_LOG_OPT.logLevel,
      format: winston.format.combine(
        winston.format.timestamp({}),
        severityFormat(),
        DEFAULT_LOG_OPT.enableJsonFormat
          ? winston.format.json()
          : plainLogFormat,
      ),
      transports: [new winston.transports.Console()],
    });
  }

  /**
   *
   * @param caller
   * @returns {Logger}
   */
  createLog = (caller: string) => {
    return this.logger.child({ caller: caller });
  };
}

const logService = new DefaultLoggerService();

export class DefaultLogger implements LoggerService {
  private readonly logger: any;

  constructor(name: string) {
    this.logger = logService.createLog(name);
  }

  /**
   * Write a 'critical' level log.
   */
  critical(message: any, ...optionalParams: any[]) {
    const metadata = resolveMetadata(...optionalParams);
    this.logger.critical(message, metadata);
    try {
      logEmitter.emit('alert', message, metadata);
    } catch (err) {
      this.logger.critical("can not emit 'alert' event", err, {
        message,
        metadata,
      });
    }
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    this.logger.warning(message, resolveMetadata(...optionalParams));
  }

  /**
   * Write a 'info' level log.
   */
  info(message: any, ...optionalParams: any[]) {
    this.logger.info(message, resolveMetadata(...optionalParams));
  }

  report(eventType: string, eventName: string, ...optionalParams: any[]) {
    const data = resolveMetadata(...optionalParams);
    data['logging.googleapis.com/labels'] = { eventType, eventName };
    this.logger.info('', data);
  }

  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    this.logger.info(message, resolveMetadata(...optionalParams));
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message, resolveMetadata(...optionalParams));
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {
    this.logger.debug(message, resolveMetadata(...optionalParams));
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {
    this.logger.debug(message, resolveMetadata(...optionalParams));
  }
}
