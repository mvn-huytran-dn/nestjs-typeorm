import { CustomExceptionMapping } from '@app/exception/exception';
import {
  CustomException,
  CustomExceptionInfo,
} from '@app/exception/exception/exception.interface';

export class InternalException extends CustomException {
  public constructor(message: string, info: CustomExceptionInfo | null = null) {
    super(CustomExceptionMapping.InternalServer, message, info);
  }
}

export class NotFoundException extends CustomException {
  public constructor(message: string, info: CustomExceptionInfo | null = null) {
    super(CustomExceptionMapping.NotFound, message, info);
  }
}

export class AlreadyExistedException extends CustomException {
  public constructor(message: string, info: CustomExceptionInfo | null = null) {
    super(CustomExceptionMapping.Conflict, message, info);
  }
}

export class InvalidArgumentException extends CustomException {
  public constructor(message: string, info: CustomExceptionInfo | null = null) {
    super(CustomExceptionMapping.InvalidArgument, message, info);
  }
}

export class DeadlineExceededException extends CustomException {
  public constructor(message: string, info: CustomExceptionInfo | null = null) {
    super(CustomExceptionMapping.Timeout, message, info);
  }
}

export class ConflictException extends CustomException {
  public constructor(message: string, info: CustomExceptionInfo | null = null) {
    super(CustomExceptionMapping.Conflict, message, info);
  }
}

export class PermissionDeniedException extends CustomException {
  public constructor(message: string, info: CustomExceptionInfo | null = null) {
    super(CustomExceptionMapping.PermissionDenied, message, info);
  }
}

export class UnauthenticatedException extends CustomException {
  public constructor(message: string, info: CustomExceptionInfo | null = null) {
    super(CustomExceptionMapping.Unauthenticated, message, info);
  }
}

export class ResourceExhaustedException extends CustomException {
  public constructor(message: string, info: CustomExceptionInfo | null = null) {
    super(CustomExceptionMapping.ResourceExhausted, message, info);
  }
}

export class FailedPreconditionException extends CustomException {
  public constructor(message: string, info: CustomExceptionInfo | null = null) {
    super(CustomExceptionMapping.FailedPrecondition, message, info);
  }
}

export class AbortedException extends CustomException {
  public constructor(message: string, info: CustomExceptionInfo | null = null) {
    super(CustomExceptionMapping.Aborted, message, info);
  }
}

export class OutOfRangeException extends CustomException {
  public constructor(message: string, info: CustomExceptionInfo | null = null) {
    super(CustomExceptionMapping.OutOfRange, message, info);
  }
}

export class UnimplementedException extends CustomException {
  public constructor(message: string, info: CustomExceptionInfo | null = null) {
    super(CustomExceptionMapping.Unimplemented, message, info);
  }
}

export class UnavailableException extends CustomException {
  public constructor(message: string, info: CustomExceptionInfo | null = null) {
    super(CustomExceptionMapping.Unavailable, message, info);
  }
}

export class TooManyRequestsException extends CustomException {
  public constructor(message: string, info: CustomExceptionInfo | null = null) {
    super(CustomExceptionMapping.TooManyRequests, message, info);
  }
}
