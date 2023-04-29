import { CacheService } from '../../cache/cache.service';
import { cityEntityListMock } from './city-entity-list.mock';

export const cacheServiceMock = {
  provide: CacheService,
  useValue: {
    getCache: jest.fn().mockResolvedValue(cityEntityListMock),
  },
};
