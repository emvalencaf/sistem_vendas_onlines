import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderEntity } from '../entities/order.entity';
import { orderEntityListMock } from './order-entity-list.mock';
import { createOrderListDTOMock } from './create-order-list-dto.mock';

export const orderRepositoryMock = {
  provide: getRepositoryToken(OrderEntity),
  useValue: {
    save: jest.fn().mockResolvedValue({
      ...orderEntityListMock[0],
      ...createOrderListDTOMock[0],
    }),
  },
};
