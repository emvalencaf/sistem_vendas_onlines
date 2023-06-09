import { userEntityListMock } from '../../user/__mocks__/user-entity-list.mock';
import { AddressService } from '../address.service';
import { addressEntityListMock } from './address-entity-list.mock';

export const addressServiceMock = {
  provide: AddressService,
  useValue: {
    create: jest.fn().mockResolvedValue(addressEntityListMock[0]),
    getAllFromUser: jest
      .fn()
      .mockResolvedValue(
        addressEntityListMock.filter(
          (address) => address.userId === userEntityListMock[0].id,
        ),
      ),
    exist: jest.fn().mockResolvedValue(true),
  },
};
