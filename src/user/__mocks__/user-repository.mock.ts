import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { userEntityListMock } from './user-entity-list.mock';
import { UpdateResult } from 'typeorm';

export const userRepositoryMock = {
  provide: getRepositoryToken(UserEntity),
  useValue: {
    save: jest.fn().mockResolvedValue(userEntityListMock[0]),
    findOne: jest.fn().mockResolvedValue(userEntityListMock[0]),
    find: jest.fn().mockResolvedValue(userEntityListMock),
    exist: jest.fn().mockResolvedValue(true),
    update: jest
      .fn()
      .mockResolvedValue({ affected: 1, raw: {} } as UpdateResult),
  },
};
