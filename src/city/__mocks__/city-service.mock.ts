import { CityService } from '../city.service';
import { cityEntityListMock } from './city-entity-list.mock';

export const cityServiceMock = {
  provide: CityService,
  useValue: {
    getById: jest.fn().mockResolvedValue(cityEntityListMock[0]),
    exist: jest.fn().mockResolvedValue(true),
  },
};
