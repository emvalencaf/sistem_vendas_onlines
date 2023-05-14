import { cityEntityListMock } from '../../city/__mocks__/city-entity-list.mock';
import { ReturnedCepInternalDTO } from '../dtos/returned-cep-internal.dto';

export const returnedCepInternalDTOMock: ReturnedCepInternalDTO = {
  cep: '34393-422',
  publicPlace: 'Rua ipsum',
  complement: '202',
  neighborhood: 'ipsum',
  uf: 'SP',
  city: cityEntityListMock[0].name,
  ddd: '44',
  cityId: cityEntityListMock[0].id,
  stateId: cityEntityListMock[0].stateId,
};
