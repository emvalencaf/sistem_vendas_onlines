import { OrderService } from '../order.service';
import { orderEntityListMock } from './order-entity-list.mock';

export const orderService = {
  provide: OrderService,
  useValue: {
    create: jest.fn().mockResolvedValue(orderEntityListMock[0]),
  },
};
