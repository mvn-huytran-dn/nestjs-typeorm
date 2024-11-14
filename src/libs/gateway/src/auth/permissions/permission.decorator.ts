import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'admin-permissions';

export const AdminPermissionRequired = (): CustomDecorator<string> =>
  SetMetadata(PERMISSIONS_KEY, []);
