import { ValidationError } from '@nestjs/common';
import { InvalidArgumentException } from '@app/exception/exception';

export const resolveValidationMessage = (
  errors: ValidationError[],
  prefix?: string,
): string => {
  try {
    return errors
      .map((error) => {
        const { property, constraints } = error;
        if (constraints) {
          return Object.keys(constraints)
            .map((key) => constraints[key])
            .join();
        } else if (property) {
          let detail = '';
          if (error.children) {
            detail = resolveValidationMessage(
              error.children,
              `${prefix || ''}${property}.`,
            );
          }
          return `${prefix || ''}${property} invalid: ${detail}`;
        }
      })
      .join(', ');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return 'Bad Request Exception';
  }
};

export const resolveValidationError = (errors: ValidationError[]): Error => {
  return new InvalidArgumentException(resolveValidationMessage(errors));
};
