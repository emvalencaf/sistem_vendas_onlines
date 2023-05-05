import { productEntityListMock } from '../../product/__mocks__/product-entity-list.mock';
import { UpdateInCartDTO } from '../dtos/update-in-cart.dto';

export const updateInCartDTOMock: UpdateInCartDTO = {
  productId: productEntityListMock[0].id,
  amount: 40,
};
