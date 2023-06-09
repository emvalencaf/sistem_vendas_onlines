import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../order.service';
import { orderProductServiceMock } from '../../order-product/__mocks__/order-product-service.mock';
import { productServiceMock } from '../../product/__mocks__/product-service.mock';
import { cartServiceMock } from '../../cart/__mocks__/cart-service.mock';
import { paymentServiceMock } from '../../payment/__mocks__/payment-service.mock';
import { orderRepositoryMock } from '../__mocks__/order-respository.mock';
import { OrderEntity } from '../entities/order.entity';
import { userEntityListMock } from '../../user/__mocks__/user-entity-list.mock';
import { orderEntityListMock } from '../__mocks__/order-entity-list.mock';
import { createOrderListDTOMock } from '../__mocks__/create-order-list-dto.mock';
import { paymentEntityListMock } from '../../payment/__mocks__/payment-entity-list.mock';
import { addressServiceMock } from '../../address/__mocks__/address-service.mock';
import { cartEntityListMock } from '../../cart/__mocks__/cart-entity-list.mock';
import { cartProductEntityListMock } from '../../cart-product/__mocks__/cart-product-entity-list.mock';
import { productEntityListMock } from '../../product/__mocks__/product-entity-list.mock';
import { addressEntityListMock } from '../../address/__mocks__/address-entity-list.mock';
import { orderProductEntityListMock } from '../../order-product/__mocks__/order-product-repository.mock';
import { returnedGroupOrderDTOMock } from '../../order-product/__mocks__/amount-product.mock';
import { ReturnedOrderDTO } from '../dtos/returned-order.dto';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    // getting module mock
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        orderRepositoryMock,
        orderProductServiceMock,
        cartServiceMock,
        paymentServiceMock,
        productServiceMock,
        addressServiceMock,
      ],
    }).compile();

    // get service from module mock
    service = module.get<OrderService>(OrderService);
  });

  describe('Module', () => {
    it('should be defined order service', () => {
      expect(service).toBeDefined();
    });
  });

  describe('Create', () => {
    describe('create method', () => {
      it('should return a order', async () => {
        jest
          .spyOn(cartServiceMock.useValue, 'getByUserId')
          .mockResolvedValueOnce({
            ...cartEntityListMock[0],
            cartProducts: cartProductEntityListMock,
          });
        jest
          .spyOn(productServiceMock.useValue, 'findAll')
          .mockResolvedValueOnce(
            productEntityListMock.filter(
              (product) =>
                product.id ===
                cartProductEntityListMock.find(
                  (cartProduct) => cartProduct.id === product.id,
                ).id,
            ),
          );
        const order: OrderEntity = await service.create(
          {
            ...createOrderListDTOMock[0],
          },
          userEntityListMock[0].id,
        );
        expect(order).toEqual(orderEntityListMock[0]);
      });
      it('should throw a not found exception cause address doesnt exists', async () => {
        jest
          .spyOn(addressServiceMock.useValue, 'exist')
          .mockRejectedValueOnce(new Error('address doesnt exists'));
        try {
          await service.create(
            {
              ...createOrderListDTOMock[0],
            },
            userEntityListMock[0].id,
          );
        } catch (err) {
          expect(err.message).toEqual('address doesnt exists');
        }
      });
      it('should throw a bad request exception cause no address id was passed', async () => {
        try {
          await service.create(
            {
              addressId: undefined,
              code: undefined,
              datePayment: undefined,
              amountPayment: undefined,
            },
            userEntityListMock[0].id,
          );
        } catch (err) {
          expect(err.message).toEqual('address is required');
        }
      });
      it('should throw a not found exception cause no cart related to user is currenty active', async () => {
        jest
          .spyOn(cartServiceMock.useValue, 'getByUserId')
          .mockRejectedValueOnce(new Error('no cart was found in database'));

        try {
          await service.create(
            {
              ...createOrderListDTOMock[0],
            },
            userEntityListMock[0].id,
          );
        } catch (err) {
          expect(err.message).toEqual('no cart was found in database');
        }
      });
      it('should thrown a not found exception cause activate cart has no product in', async () => {
        jest
          .spyOn(cartServiceMock.useValue, 'getByUserId')
          .mockResolvedValueOnce({
            ...cartEntityListMock[0],
            cartProduct: undefined,
          });
        try {
          await service.create(
            {
              ...createOrderListDTOMock[0],
            },
            userEntityListMock[0].id,
          );
        } catch (err) {
          expect(err.message).toEqual(
            'no product was found related to this cart id',
          );
        }
      });
    });
    describe('save method', () => {
      it('should returned an order data', async () => {
        const expectResult: OrderEntity = {
          ...orderEntityListMock[0],
          addressId: createOrderListDTOMock[0].addressId,
        };

        const order: OrderEntity = await service.save(
          {
            addressId: createOrderListDTOMock[0].addressId,
          },
          userEntityListMock[0].id,
          paymentEntityListMock[0].id,
        );

        expect(order).toEqual(expectResult);
      });
      it('should throw an internal server error exception', async () => {
        jest
          .spyOn(orderRepositoryMock.useValue, 'save')
          .mockRejectedValueOnce(new Error('error on database'));
        try {
          await service.save(
            {
              addressId: createOrderListDTOMock[0].addressId,
            },
            userEntityListMock[0].id,
            paymentEntityListMock[0].id,
          );
        } catch (err) {
          expect(err.message).toEqual('error on database');
        }
      });
    });
  });
  describe('Read', () => {
    describe('findByUserId method', () => {
      it('should returned all orders realted to an user id ', async () => {
        // expected result
        const expectResult: OrderEntity[] = orderEntityListMock.filter(
          (order) => order.userId === userEntityListMock[0].id,
        );

        const orders: OrderEntity[] = await service.findByUserId(
          userEntityListMock[0].id,
        );

        expect(orders).toEqual(expectResult);
      });

      it('should throw a not found exception error', async () => {
        // expected result
        jest
          .spyOn(orderRepositoryMock.useValue, 'find')
          .mockResolvedValueOnce([]);

        try {
          await service.findByUserId(userEntityListMock[0].id);
        } catch (err) {
          expect(err.message).toEqual('no order found in database');
        }
      });
    });
    describe('getAll method', () => {
      it('should returned a list of order with no relations', async () => {
        const expectedResult: ReturnedOrderDTO[] = orderEntityListMock.map(
          (order) =>
            new ReturnedOrderDTO({
              ...order,
              date: order.date,
              amountProducts: Number(
                returnedGroupOrderDTOMock.find(
                  (returnedGroupOrder) =>
                    returnedGroupOrder.order_id === order.id,
                ).total,
              ),
            }),
        );
        jest
          .spyOn(orderRepositoryMock.useValue, 'find')
          .mockResolvedValue(expectedResult);

        const orders: OrderEntity[] = await service.getAll();

        expect(orders).toEqual(expectedResult);
      });
      it('should returned a list of order with relations', async () => {
        const expectedResult: OrderEntity[] = orderEntityListMock.map(
          (order) => ({
            ...order,
            user: userEntityListMock.find((user) => user.id === order.userId),
            amountProducts: Number(
              returnedGroupOrderDTOMock.find(
                (returnedGroupOrder) =>
                  returnedGroupOrder.order_id === order.id,
              ).total,
            ),
          }),
        );

        jest
          .spyOn(orderRepositoryMock.useValue, 'find')
          .mockResolvedValueOnce(expectedResult);

        const orders: OrderEntity[] = await service.getAll(true);

        expect(orders).toEqual(expectedResult);
      });

      it('should throw a not found exception', async () => {
        jest.spyOn(orderRepositoryMock.useValue, 'find').mockResolvedValue([]);
        try {
          await service.getAll();
        } catch (err) {
          expect(err.message).toEqual('no order found in database');
        }
      });
    });
    describe('getById method', () => {
      it('should returned a order without relations', async () => {
        const order: OrderEntity = await service.getById(
          orderEntityListMock[0].id,
        );
        expect(order).toEqual(orderEntityListMock[0]);
      });
      it('should returned a order with relations', async () => {
        const expectedResult: OrderEntity = {
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
        jest
          .spyOn(orderRepositoryMock.useValue, 'findOne')
          .mockResolvedValueOnce(expectedResult);
        const order: OrderEntity = await service.getById(
          orderEntityListMock[0].id,
          true,
        );

        expect(order).toEqual(expectedResult);
      });
      it('should throw a not found exception', async () => {
        jest
          .spyOn(orderRepositoryMock.useValue, 'findOne')
          .mockResolvedValueOnce(undefined);
        try {
          await service.getById(orderEntityListMock[0].id);
        } catch (err) {
          expect(err.message).toEqual('no order found in database');
        }
      });
    });
  });
});
