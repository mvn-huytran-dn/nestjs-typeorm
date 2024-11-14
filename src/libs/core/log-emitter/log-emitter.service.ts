import * as EventEmitter from 'node:events';

export class LogEmitter extends EventEmitter {
  constructor() {
    super();
  }
}

export const logEmitter = new LogEmitter();
