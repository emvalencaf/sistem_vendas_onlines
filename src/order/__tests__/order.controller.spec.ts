import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '../order.controller';
import { orderServiceMock } from '../__mocks__/order-service.mock';
import { orderProductServiceMock } from '../../order-product/__mocks__/order-product-service.mock';
import { paymentServiceMock } from '../../payment/__mocks__/payment-service.mock';
import { cartServiceMock } from '../../cart/__mocks__/cart-service.mock';
import { productServiceMock } from '../../product/__mocks__/product-service.mock';
import { OrderEntity } from '../entities/order.entity';
import { createOrderListDTOMock } from '../__mocks__/create-order-list-dto.mock';
import { userEntityListMock } from '../../user/__mocks__/user-entity-list.mock';
import { orderEntityListMock } from '../__mocks__/order-entity-list.mock';
import { ReturnedOrderDTO } from '../dtos/returned-order.dto';
import { addressEntityListMock } from '../../address/__mocks__/address-entity-list.mock';
import { paymentEntityListMock } from '../../payment/__mocks__/payment-entity-list.mock';
import { orderProductEntityListMock } from '../../order-product/__mocks__/order-product-repository.mock';

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

  describe('Create', () => {
    describe('create method', () => {
      it('should return an order data', async () => {
        const order: OrderEntity = await controller.create(
          { ...createOrderListDTOMock[0] },
          userEntityListMock[0].id,
        );
        expect(order).toEqual(orderEntityListMock[0]);
      });
    });
  });

  describe('Read', () => {
    describe('findByUserId method', () => {
      it('should return orders related to an user id', async () => {
        const expectedResult: OrderEntity[] = orderEntityListMock.filter(
          (order) => order.userId === userEntityListMock[0].id,
        );
        const orders: OrderEntity[] = await controller.findByUserId(
          userEntityListMock[0].id,
        );
        expect(orders).toEqual(expectedResult);
      });
    });

    describe('getAll method', () => {
      it('should returned a list of orders', async () => {
        const expectedResult: ReturnedOrderDTO[] = orderEntityListMock.map(
          (order) =>
            new ReturnedOrderDTO({
              ...order,
              user: userEntityListMock.find((user) => user.id === order.userId),
            }),
        );

        const orders: ReturnedOrderDTO[] = await controller.getAll();

        expect(orders).toEqual(expectedResult);
      });
    });

    describe('getById method', () => {
      it('should returned a order by id with relations', async () => {
        const expectedResultService: OrderEntity = {
          ...orderEntityListMock[0],
          user: userEntityListMock.find(
            (user) => user.id === orderEntityListMock[0].userId,
          ),
          payment: paymentEntityListMock.find(
            (payment) => payment.id === orderEntityListMock[0].paymentId,
          ),
          address: addressEntityListMock.find(
            (address) => address.id === orderEntityListMock[0].addressId,
          ),
          orderProducts: orderProductEntityListMock.filter(
            (orderProduct) =>
              orderProduct.orderId === orderEntityListMock[0].id,
          ),
        };
        const expectedResult: ReturnedOrderDTO = new ReturnedOrderDTO(
          expectedResultService,
        );
        jest
          .spyOn(orderServiceMock.useValue, 'getById')
          .mockResolvedValueOnce(expectedResultService);
        const order: ReturnedOrderDTO = await controller.getById(
          orderEntityListMock[0].id,
        );
        expect(order).toEqual(expectedResult);
      });
    });
  });
});
