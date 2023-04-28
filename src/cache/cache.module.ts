import { Module } from '@nestjs/common';

// modules
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { CacheService } from './cache.service';
@Module({
  imports: [
    NestCacheModule.register({
      ttl: 900000000,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
