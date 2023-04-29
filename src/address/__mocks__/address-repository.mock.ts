import { getRepositoryToken } from '@nestjs/typeorm';
import { AddressEntity } from '../entity/address.entity';
import { addressEntityListMock } from './address-entity-list.mock';

export const addressRepositoryMock = {
  provide: getRepositoryToken(AddressEntity),
  useValue: {
    save: jest.fn().mockResolvedValue(addressEntityListMock[0]),
  },
};
