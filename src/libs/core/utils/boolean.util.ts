export function toBoolean(value: any) {
  if (typeof value === 'undefined' || value === null) return null;
  if (typeof value === 'string') return value == 'true' || value == 'True';
  if (typeof value === 'boolean') return value;
  return false;
}
