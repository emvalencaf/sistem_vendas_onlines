import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { userEntityListMock } from '../../user/__mocks__/user-entity-list.mock';

export const cacheManagerMock = {
  provide: CACHE_MANAGER,
  useValue: {
    get: jest.fn().mockResolvedValue(userEntityListMock[0]),
    set: jest.fn(),
  },
};
