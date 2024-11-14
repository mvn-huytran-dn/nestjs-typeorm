import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'no-auth';
export const NO_TRANSFORM_KEY = 'no-transform';
export const IS_AUTHORIZATION = 'Authorization';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const NoAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
export const NoTransform = () => SetMetadata(NO_TRANSFORM_KEY, true);
