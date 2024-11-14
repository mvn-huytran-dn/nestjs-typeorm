import * as winston from 'winston';
import { logEmitter } from '../log-emitter';
import { resolveMetadata } from './logger.util';

export class LoggerService {
  private logger: any;

  constructor(logger: winston.Logger) {
    this.logger = logger;
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
