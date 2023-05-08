import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '../order.controller';
import { orderServiceMock } from '../__mocks__/order-service.mock';
import { orderProductServiceMock } from '../../order-product/__mocks__/order-product-service.mock';
import { paymentServiceMock } from '../../payment/__mocks__/payment-service.mock';
import { cartServiceMock } from '../../cart/__mocks__/cart-service.mock';
import { productServiceMock } from '../../product/__mocks__/product-service.mock';

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    // getting module mock
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        orderServiceMock,
        orderProductServiceMock,
        cartServiceMock,
        paymentServiceMock,
        productServiceMock,
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  describe('Module', () => {
    it('should order controller be defined', () => {
      expect(controller).toBeDefined();
    });
  });
});
