import { addressEntityListMock } from '../../address/__mocks__/address-entity-list.mock';
import { userEntityListMock } from '../../user/__mocks__/user-entity-list.mock';
import { OrderEntity } from '../entities/order.entity';

export const orderEntityListMock: OrderEntity[] = [
  {
    id: 1,
    user_id: userEntityListMock[0].id,
    payment_id: 1,
    address_id: addressEntityListMock[0].id,
    createdAt: new Date(),
    date: new Date(),
    updatedAt: new Date(),
  },
];
