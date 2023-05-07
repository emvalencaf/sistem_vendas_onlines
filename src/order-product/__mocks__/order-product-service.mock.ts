import { OrderProductService } from '../order-product.service';
import { createOrderProductDTOMock } from './create-order-product-dto.mock';
import { orderProductEntityListMock } from './order-product-repository.mock';

export const orderProductServiceMock = {
  provide: OrderProductService,
  useValue: {
    create: jest.fn().mockResolvedValue({
      ...orderProductEntityListMock[0],
      ...createOrderProductDTOMock,
    }),
  },
};
