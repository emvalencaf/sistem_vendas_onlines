import { productEntityListMock } from '../../product/__mocks__/product-entity-list.mock';
import { InsertInCartDTO } from '../dtos/insert-in-cart.dto';

export const insertInCartDTOMock: InsertInCartDTO = {
  productId: productEntityListMock[0].id,
  amount: 20,
};
