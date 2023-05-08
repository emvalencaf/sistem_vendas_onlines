import { cartProductEntityListMock } from '../../cart-product/__mocks__/cart-product-entity-list.mock';
import { orderEntityListMock } from '../../order/__mocks__/order-entity-list.mock';
import { OrderProductEntity } from '../entities/order-product.entity';

export const orderProductEntityListMock: OrderProductEntity[] = [
  {
    id: 1,
    orderId: orderEntityListMock[0].id,
    productId: cartProductEntityListMock[0].productId,
    price: 1000,
    amount: cartProductEntityListMock[0].amount,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
