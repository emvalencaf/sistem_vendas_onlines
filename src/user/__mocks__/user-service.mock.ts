import { UserService } from '../user.service';
import { userEntityListMock } from './user-entity-list.mock';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    getByEmail: jest.fn().mockResolvedValue(userEntityListMock[0]),
    getById: jest.fn().mockResolvedValue(userEntityListMock[0]),
    exist: jest.fn().mockResolvedValue(true),
  },
};
