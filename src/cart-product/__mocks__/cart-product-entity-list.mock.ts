// entities
import { CartProductEntity } from '../entities/cart-product.entity';

// mocks
import { cartEntityListMock } from '../../cart/__mocks__/cart-entity-list.mock';
import { insertInCartDTOMock } from '../../cart/__mocks__/insert-in-cart-dto.mock';
import { productEntityListMock } from '../../product/__mocks__/product-entity-list.mock';

export const cartProductEntityListMock: CartProductEntity[] = [
  {
    id: 1,
    productId: insertInCartDTOMock.productId,
    cartId: cartEntityListMock[0].id,
    amount: insertInCartDTOMock.amount,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: 2,
    productId: productEntityListMock[1].id,
    cartId: cartEntityListMock[0].id,
    amount: 10,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: 3,
    productId: productEntityListMock[2].id,
    cartId: cartEntityListMock[0].id,
    amount: 5,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
];
