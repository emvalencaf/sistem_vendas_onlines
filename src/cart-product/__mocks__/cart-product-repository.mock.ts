import { getRepositoryToken } from '@nestjs/typeorm';
import { CartProductEntity } from '../entity/cart-product.entity';
import { cartProductEntityListMock } from './cart-product-entity-list.mock';
import { DeleteResult } from 'typeorm';

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
