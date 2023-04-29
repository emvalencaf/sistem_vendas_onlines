import { getRepositoryToken } from '@nestjs/typeorm';
import { CityEntity } from '../entity/city.entity';
import { cityEntityListMock } from './city-entity-list.mock';

export const cityRepositoryMock = {
  provide: getRepositoryToken(CityEntity),
  useValue: {
    findOne: jest.fn().mockResolvedValue(cityEntityListMock[0]),
  },
};
