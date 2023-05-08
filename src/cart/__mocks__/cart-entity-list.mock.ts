import { cartProductEntityListMock } from '../../cart-product/__mocks__/cart-product-entity-list.mock';
import { userEntityListMock } from '../../user/__mocks__/user-entity-list.mock';
import { CartEntity } from '../entities/cart.entity';

export const cartEntityListMock: CartEntity[] = [
  {
    id: 1,
    userId: userEntityListMock[0].id,
    active: true,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
];
