import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from '../cache.service';
import { cacheManagerMock } from '../__mocks__/cache-manager.mock';
import { userEntityListMock } from '../../user/__mocks__/user-entity-list.mock';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(async () => {
    // getting cache module
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheService, cacheManagerMock],
    }).compile();

    // getting cache service
    service = module.get<CacheService>(CacheService);
  });

  it('should cache service be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Read and Set', () => {
    it('should returned data in cache', async () => {
      const user = await service.getCache('key', () => null);

      expect(user).toEqual(userEntityListMock[0]);
    });
    it('should set data in cache', async () => {
      const cbFnResult = { test: 'olá' };
      const cbFn = () => Promise.resolve(cbFnResult);
      jest.spyOn(cacheManagerMock.useValue, 'get').mockResolvedValue(undefined);
      const result = await service.getCache('key', cbFn);

      expect(result).toEqual(cbFnResult);
    });
  });
});
