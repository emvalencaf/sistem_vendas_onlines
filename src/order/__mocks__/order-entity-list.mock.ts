import { addressEntityListMock } from '../../address/__mocks__/address-entity-list.mock';
import { paymentEntityListMock } from '../../payment/__mocks__/payment-entity-list.mock';
import { userEntityListMock } from '../../user/__mocks__/user-entity-list.mock';
import { OrderEntity } from '../entities/order.entity';

export const orderEntityListMock: OrderEntity[] = [
  {
    id: 1,
    userId: userEntityListMock[0].id,
    paymentId: paymentEntityListMock[0].id,
    addressId: addressEntityListMock[0].id,
    createdAt: new Date(),
    date: new Date(),
    updatedAt: new Date(),
  },
];
