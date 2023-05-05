import { CacheService } from '../../cache/cache.service';
import { stateEntityListMock } from '../../state/__mocks__/state-entity-list.mock';
import { cityEntityListMock } from './city-entity-list.mock';

export const cacheServiceMock = {
  provide: CacheService,
  useValue: {
    getCache: jest
      .fn()
      .mockResolvedValue(
        cityEntityListMock.filter(
          (city) => city.stateId === stateEntityListMock[0].id,
        ),
      ),
  },
};
