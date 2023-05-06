import { getRepositoryToken } from '@nestjs/typeorm';
import { stateEntityListMock } from './state-entity-list.mock';
import { StateEntity } from '../entities/state.entity';

export const stateRepositoryMock = {
  provide: getRepositoryToken(StateEntity),
  useValue: {
    find: jest.fn().mockResolvedValue(stateEntityListMock),
  },
};
