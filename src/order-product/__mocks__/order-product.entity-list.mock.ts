import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderProductEntity } from '../entities/order-product.entity';
import { orderProductEntityListMock } from './order-product-repository.mock';

export const orderProductRepositoryMock = {
  provide: getRepositoryToken(OrderProductEntity),
  useValue: {
    save: jest.fn().mockResolvedValue(orderProductEntityListMock[0]),
    find: jest.fn().mockResolvedValue(orderProductEntityListMock),
  },
};
