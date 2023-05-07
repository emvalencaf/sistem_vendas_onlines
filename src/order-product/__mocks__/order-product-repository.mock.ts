import { cartEntityListMock } from '../../cart/__mocks__/cart-entity-list.mock';
import { orderEntityListMock } from '../../order/__mocks__/order-entity-list.mock';
import { OrderProductEntity } from '../entities/order-product.entity';

export const orderProductEntityListMock: OrderProductEntity[] = [
  {
    id: 1,
    orderId: orderEntityListMock[0].id,
    productId: cartEntityListMock[0].cartProducts[0].productId,
    price: 1000,
    amount: cartEntityListMock[0].cartProducts[0].amount,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
