import { HttpStatus } from '@nestjs/common';
import {
  CustomException,
  CustomExceptionInfo,
  CustomProtocolInfo,
} from '@app/exception/exception/exception.interface';
import {
  EXCEPTION_PREFIX,
  EXCEPTION_SEPARATOR,
} from '@app/exception/exception/exception.constant';

export const CustomExceptionMapping = {
  InternalServer: {
    name: 'Internal Server Error',
    httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },

  InvalidArgument: {
    name: 'Invalid Argument Error',
    httpCode: HttpStatus.BAD_REQUEST,
  },

  Timeout: {
    name: 'Request Timeout Error',
    httpCode: HttpStatus.GATEWAY_TIMEOUT,
  },

  NotFound: {
    name: 'Not Found Error',
    httpCode: HttpStatus.NOT_FOUND,
  },

  Conflict: {
    name: 'Conflict Error',
    httpCode: HttpStatus.CONFLICT,
  },

  PermissionDenied: {
    name: 'Permission Denied Error',
    httpCode: HttpStatus.FORBIDDEN,
  },

  Unauthenticated: {
    name: 'Unauthenticated Error',
    httpCode: HttpStatus.UNAUTHORIZED,
  },

  ResourceExhausted: {
    name: 'Resource Exhausted Error',
    httpCode: HttpStatus.TOO_MANY_REQUESTS,
  },

  FailedPrecondition: {
    name: 'Failed Precondition Error',
    httpCode: HttpStatus.PRECONDITION_FAILED,
  },

  Aborted: {
    name: 'Aborted Error',
    httpCode: HttpStatus.NOT_ACCEPTABLE,
  },

  OutOfRange: {
    name: 'Out Of Range Error',
    httpCode: HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE,
  },
  Unimplemented: {
    name: 'Unimplemented Error',
    httpCode: HttpStatus.NOT_IMPLEMENTED,
  },

  Unavailable: {
    name: 'Unavailable Error',
    httpCode: HttpStatus.SERVICE_UNAVAILABLE,
  },

  TooManyRequests: {
    name: 'Too Many Requests Error',
    httpCode: HttpStatus.TOO_MANY_REQUESTS,
  },
};

export const encryptCustomException = (exception: CustomException): string => {
  return [
    EXCEPTION_PREFIX,
    JSON.stringify(exception.protocolInfo),
    exception.message,
    JSON.stringify(exception.info),
  ].join(EXCEPTION_SEPARATOR);
};

export const decryptCustomException = (details: string): CustomException => {
  const parts = details.split(EXCEPTION_SEPARATOR);
  if (parts.length !== 4 || parts[0] !== EXCEPTION_PREFIX) {
    throw new Error('invalid format of custom exception details');
  }

  const protocolInfo: CustomProtocolInfo = JSON.parse(parts[1]);

  const message = parts[2];
  let info: CustomExceptionInfo;
  try {
    info = JSON.parse(parts[3]);
  } catch (err) {
    throw new Error('failed to parse json info for error details');
  }

  return new CustomException(protocolInfo, message, info);
};
