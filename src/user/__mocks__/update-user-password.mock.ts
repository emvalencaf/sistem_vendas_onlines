import { UpdateUserPasswordDTO } from '../dtos/update-user-password.dto';
import { userEntityListMock } from './user-entity-list.mock';

export const updateUserPasswordDTO: UpdateUserPasswordDTO = {
  newPassword: '654321',
  lastPassword: userEntityListMock[0].password,
};
