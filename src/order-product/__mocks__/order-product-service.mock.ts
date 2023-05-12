import { OrderProductService } from '../order-product.service';
import { returnedGroupOrderDTOMock } from './amount-product.mock';
import { createOrderProductDTOMock } from './create-order-product-dto.mock';
import { orderProductEntityListMock } from './order-product-repository.mock';

export const orderProductServiceMock = {
  provide: OrderProductService,
  useValue: {
    create: jest.fn().mockResolvedValue({
      ...orderProductEntityListMock[0],
      ...createOrderProductDTOMock,
    }),
    getAmountProductById: jest
      .fn()
      .mockResolvedValue(returnedGroupOrderDTOMock),
    find: jest.fn().mockResolvedValue(orderProductEntityListMock),
  },
};
