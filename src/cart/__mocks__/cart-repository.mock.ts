import { CartEntity } from '../entities/cart.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { cartEntityListMock } from './cart-entity-list.mock';

export const cartRepositoryMock = {
  provide: getRepositoryToken(CartEntity),
  useValue: {
    findOne: jest.fn().mockResolvedValue(cartEntityListMock[0]),
    save: jest.fn().mockResolvedValue(cartEntityListMock[0]),
  },
};
