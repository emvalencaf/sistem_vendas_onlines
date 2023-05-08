import { userEntityListMock } from '../../user/__mocks__/user-entity-list.mock';
import { OrderService } from '../order.service';
import { createOrderListDTOMock } from './create-order-list-dto.mock';
import { orderEntityListMock } from './order-entity-list.mock';

export const orderService = {
  provide: OrderService,
  useValue: {
    create: jest.fn().mockResolvedValue({
      ...orderEntityListMock[0],
      ...createOrderListDTOMock[0],
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
  },
};
