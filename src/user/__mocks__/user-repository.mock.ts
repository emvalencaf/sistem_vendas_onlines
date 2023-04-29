import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { userEntityListMock } from './user-entity-list.mock';

export const userRepositoryMock = {
  provide: getRepositoryToken(UserEntity),
  useValue: {
    save: jest.fn().mockResolvedValue(userEntityListMock[0]),
    findOne: jest.fn().mockResolvedValue(userEntityListMock[0]),
    find: jest.fn().mockResolvedValue(userEntityListMock),
  },
};
