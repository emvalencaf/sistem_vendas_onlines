// services
import { DeleteResult } from 'typeorm';
import { CartProductService } from '../cart-product.service';

// mocks
import { cartProductEntityListMock } from './cart-product-entity-list.mock';

export const cartProductServiceMock = {
  provide: CartProductService,
  useValue: {
    insertProductIn: jest.fn().mockResolvedValue(cartProductEntityListMock[0]),
    deleteProductIn: jest.fn().mockResolvedValue({
      affected: 1,
      raw: [],
    } as DeleteResult),
  },
};
