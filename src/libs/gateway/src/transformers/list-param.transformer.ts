import { Transform } from 'class-transformer';

export function TransformListParam() {
  return Transform(({ value }: { value: unknown | unknown[] }) => {
    if (!value) {
      return value;
    }
    if (!Array.isArray(value)) {
      return [value];
    }
    return value;
  });
}
