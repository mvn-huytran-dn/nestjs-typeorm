import { HttpStatus } from '@nestjs/common';

export interface CustomProtocolInfo {
  name: string;
  httpCode: HttpStatus;
}

export interface CustomExceptionInfo {
  code?: string; // Custom specific code.
  metadata?: any; // metadata to add more info to the errors, will not be returned to client.
  errorDetails?: Record<string, unknown>; // Error details to send to client
}

export class CustomException extends Error {
  constructor(
    public readonly protocolInfo: CustomProtocolInfo,
    message: string,
    public readonly info: CustomExceptionInfo | null = null,
  ) {
    super(message);
    this.name = protocolInfo.name;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }

  static checkErrorCode(err: Error, code: string) {
    if (!(err instanceof CustomException)) {
      return false;
    }
    return err?.info?.code === code;
  }
}
