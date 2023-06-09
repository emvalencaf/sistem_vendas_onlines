// decorators
import { Module } from '@nestjs/common';

// modules
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '../cache/cache.module';

// controllers
import { CityController } from './city.controller';

// services
import { CityService } from './city.service';

// entities
import { CityEntity } from './entities/city.entity';

@Module({
  imports: [CacheModule, TypeOrmModule.forFeature([CityEntity])],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService],
})
export class CityModule {}
