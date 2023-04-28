// decorators
import { Inject, Injectable } from '@nestjs/common';

// utils
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  // get cache
  async getCache<T>(key: string, fnRequest: () => Promise<T>): Promise<T> {
    // get cache from the key in the memory
    const cache: T = await this.cacheManager.get(key);

    if (cache) return cache;

    // if no cache is found it the memory
    // request the data from db
    const newCache: T = await fnRequest();

    // save the data in the cache
    await this.cacheManager.set(key, newCache);

    // returned data
    return newCache;
  }
}
