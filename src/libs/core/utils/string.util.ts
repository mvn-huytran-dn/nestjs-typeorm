import * as bcrypt from 'bcrypt';

export function hashString(str: string): string {
  return bcrypt.hashSync(str, 10);
}

export function compareString(str: string, hash: string): boolean {
  return bcrypt.compareSync(str, hash);
}

export function randomString(length: number): string {
  const charset =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}
