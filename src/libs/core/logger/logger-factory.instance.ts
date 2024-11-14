import { LoggerFactoryService } from '../logger/logger-factory.service';

export class LoggerFactoryWrapper {
  private loggerFactory: LoggerFactoryService;
  private initialized: boolean;

  constructor() {
    this.initialized = false;
  }

  init(loggerFactory: LoggerFactoryService) {
    if (this.initialized) {
      throw new Error('logger factory wrapper initialized twice');
    }
    this.loggerFactory = loggerFactory;
    this.initialized = true;
  }

  getLoggerFactory(): LoggerFactoryService {
    return this.loggerFactory;
  }
}

export const loggerFactoryWrapper = new LoggerFactoryWrapper();
