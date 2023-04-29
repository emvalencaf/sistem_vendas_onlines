import { SetMetadata } from '@nestjs/common';

// enums
import { UserType } from '../enums/user-types.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserType[]) => SetMetadata(ROLES_KEY, roles);
