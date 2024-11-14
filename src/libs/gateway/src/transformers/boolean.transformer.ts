import { toBoolean } from '@app/core/utils';
import { Transform } from 'class-transformer';

export function TransformBoolean() {
  return Transform(({ value }: { value: string }) => {
    return value ? toBoolean(value) : undefined;
  });
}
