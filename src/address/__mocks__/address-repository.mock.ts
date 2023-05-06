import { getRepositoryToken } from '@nestjs/typeorm';
import { AddressEntity } from '../entities/address.entity';
import { addressEntityListMock } from './address-entity-list.mock';

export const addressRepositoryMock = {
  provide: getRepositoryToken(AddressEntity),
  useValue: {
    save: jest.fn().mockResolvedValue(addressEntityListMock[0]),
    find: jest.fn().mockRejectedValue(addressEntityListMock),
  },
};
