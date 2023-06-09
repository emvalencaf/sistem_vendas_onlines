import { userEntityListMock } from '../../user/__mocks__/user-entity-list.mock';
import { OrderService } from '../order.service';
import { createOrderListDTOMock } from './create-order-list-dto.mock';
import { orderEntityListMock } from './order-entity-list.mock';

export const orderServiceMock = {
  provide: OrderService,
  useValue: {
    create: jest.fn().mockResolvedValue({
      ...orderEntityListMock[0],
      addressId: createOrderListDTOMock[0].addressId,
    }),
    save: jest.fn().mockResolvedValue({
      ...orderEntityListMock[0],
      ...createOrderListDTOMock[0],
    }),
    findByUserId: jest
      .fn()
      .mockResolvedValue(
        orderEntityListMock.filter(
          (order) => order.userId === userEntityListMock[0].id,
        ),
      ),
    getAll: jest.fn().mockResolvedValue(
      orderEntityListMock.map((order) => ({
        ...order,
        user: userEntityListMock.find((user) => user.id === order.userId),
      })),
    ),
    getById: jest.fn().mockResolvedValue(orderEntityListMock[0]),
  },
};
