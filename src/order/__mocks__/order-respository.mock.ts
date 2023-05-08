import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderEntity } from '../entities/order.entity';
import { orderEntityListMock } from './order-entity-list.mock';
import { createOrderListDTOMock } from './create-order-list-dto.mock';
import { userEntityListMock } from '../../user/__mocks__/user-entity-list.mock';

export const orderRepositoryMock = {
  provide: getRepositoryToken(OrderEntity),
  useValue: {
    save: jest.fn().mockResolvedValue({
      ...orderEntityListMock[0],
      addressId: createOrderListDTOMock[0].addressId,
    }),
    find: jest
      .fn()
      .mockResolvedValue(
        orderEntityListMock.filter(
          (order) => order.userId === userEntityListMock[0].id,
        ),
      ),
  },
};
