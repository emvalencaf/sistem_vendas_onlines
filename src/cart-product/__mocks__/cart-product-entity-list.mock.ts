// entities
import { CartProductEntity } from '../entity/cart-product.entity';

// mocks
import { cartEntityListMock } from '../../cart/__mocks__/cart-entity-list.mock';
import { insertInCartDTOMock } from '../../cart/__mocks__/insert-in-cart-dto.mock';

export const cartProductEntityListMock: CartProductEntity[] = [
  {
    id: 1,
    productId: insertInCartDTOMock.productId,
    cartId: cartEntityListMock[0].id,
    amount: insertInCartDTOMock.amount,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
];
