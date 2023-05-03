// entities and tools
import { CartProductEntity } from '../entity/cart-product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';

// mocks
import { cartProductEntityListMock } from './cart-product-entity-list.mock';

export const cartProductRepositoryMock = {
  provide: getRepositoryToken(CartProductEntity),
  useValue: {
    findOne: jest.fn().mockResolvedValue(cartProductEntityListMock[0]),
    exist: jest.fn().mockResolvedValue(true),
    save: jest.fn().mockResolvedValue(cartProductEntityListMock[0]),
    delete: jest.fn().mockResolvedValue({
      affected: 1,
      raw: [],
    } as DeleteResult),
  },
};
