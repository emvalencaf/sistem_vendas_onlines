// decorators
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// entities
import { CityEntity } from './entities/city.entity';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    private readonly cacheService: CacheService,
  ) {}

  // get all cities by a state id
  async getAllByStateId(stateId: number): Promise<CityEntity[]> {
    return this.cacheService.getCache<CityEntity[]>(`state_${stateId}`, () =>
      this.cityRepository.find({
        where: {
          stateId,
        },
      }),
    );
  }

  // get a city by it's id
  async getById(cityId: number): Promise<CityEntity> {
    const city = await this.cityRepository.findOne({
      where: {
        id: cityId,
      },
    });

    if (!city) throw new NotFoundException('city not found it');

    return city;
  }

  // get a city by name
  async FindCityByName(nameCity: string, uf: string): Promise<CityEntity> {
    const city = await this.cityRepository.findOne({
      where: {
        name: nameCity,
        state: {
          uf,
        },
      },
      relations: {
        state: true,
      },
    });

    if (!city) throw new NotFoundException('City not found');

    return city;
  }

  // check if city exists
  async exist(cityId: number): Promise<boolean> {
    // custom the where options
    const isExist: boolean = await this.cityRepository
      .exist({
        where: {
          id: cityId,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException('error on database');
      });
    return isExist;
  }
}
