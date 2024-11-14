import { Transform, TransformFnParams } from 'class-transformer';

/**
 * Transforms a phone number by removing all non-numeric characters.
 *
 * @param phoneNumber - The phone number string to be transformed.
 * @returns The transformed phone number containing only numeric characters.
 * @example TransformPhoneNumber('0812345678') => '0812345678'
 */
export function TransformPhoneNumber() {
  return Transform(({ value }: TransformFnParams) => {
    const phone = value.replace(/[^0-9]/g, '');
    if (phone.startsWith('0')) {
      return phone.slice(1);
    }

    return phone;
  });
}
