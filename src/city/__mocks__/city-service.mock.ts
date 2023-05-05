import { stateEntityListMock } from '../../state/__mocks__/state-entity-list.mock';
import { CityService } from '../city.service';
import { cityEntityListMock } from './city-entity-list.mock';

export const cityServiceMock = {
  provide: CityService,
  useValue: {
    getById: jest.fn().mockResolvedValue(cityEntityListMock[0]),
    getAllByStateId: jest
      .fn()
      .mockResolvedValue(
        cityEntityListMock.filter(
          (city) => city.stateId === stateEntityListMock[0].id,
        ),
      ),
    exist: jest.fn().mockResolvedValue(true),
  },
};
