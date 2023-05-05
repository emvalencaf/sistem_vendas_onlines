import { UserService } from '../user.service';
import { createUserDTOMock } from './user-create-dto.mock';
import { userEntityListMock } from './user-entity-list.mock';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    getByEmail: jest.fn().mockResolvedValue(userEntityListMock[0]),
    getById: jest.fn().mockResolvedValue(userEntityListMock[0]),
    getByIdWithRelations: jest.fn().mockResolvedValue(userEntityListMock[0]),
    getAll: jest.fn().mockResolvedValue(userEntityListMock),
    create: jest.fn().mockResolvedValue({
      ...userEntityListMock[0],
      ...createUserDTOMock,
    }),
    updatePassword: jest.fn().mockResolvedValue(true),
    exist: jest.fn().mockResolvedValue(true),
  },
};
