import { cartProductEntityListMock } from '../../cart-product/__mocks__/cart-product-entity-list.mock';
import { orderEntityListMock } from '../../order/__mocks__/order-entity-list.mock';
import { CreateOrderProductDTO } from '../dtos/create-order-product.dto';

export const createOrderProductDTOMock: CreateOrderProductDTO = {
  productId: cartProductEntityListMock[0].productId,
  orderId: orderEntityListMock[0].id,
  amount: cartProductEntityListMock[0].amount,
  price: 900,
};
