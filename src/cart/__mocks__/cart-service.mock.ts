import { DeleteResult } from 'typeorm';
import { CartService } from '../cart.service';
import { cartEntityListMock } from './cart-entity-list.mock';

export const cartServiceMock = {
  provide: CartService,
  useValue: {
    getByUserId: jest.fn().mockResolvedValue(cartEntityListMock[0]),
    getById: jest.fn().mockResolvedValue(cartEntityListMock[0]),
    exist: jest.fn().mockResolvedValue(true),
    deleteProductIn: jest.fn().mockResolvedValue({
      affected: 1,
      raw: [],
    } as DeleteResult),
    clear: jest.fn().mockResolvedValue({
      affected: 1,
      raw: [],
    } as DeleteResult),
  },
};
