import { stateEntityListMock } from '../../state/__mocks__/state-entity-list.mock';
import { CityEntity } from '../entities/city.entity';

export const cityEntityListMock: CityEntity[] = [
  {
    id: 1,
    name: 'rio',
    stateId: stateEntityListMock[0].id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'mar',
    stateId: stateEntityListMock[0].id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
