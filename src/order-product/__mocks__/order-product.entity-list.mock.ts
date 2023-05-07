import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderProductEntity } from '../entities/order-product.entity';

export const orderProductRepositoryMock = {
  provide: getRepositoryToken(OrderProductEntity),
  useValue: {
    save: jest.fn().mockResolvedValue({}),
  },
};
