import { Test, TestingModule } from '@nestjs/testing';
import { OrderProductService } from '../order-product.service';
import { orderProductRepositoryMock } from '../__mocks__/order-product.entity-list.mock';
import { OrderProductEntity } from '../entities/order-product.entity';
import { orderProductEntityListMock } from '../__mocks__/order-product-repository.mock';
import { createOrderProductDTOMock } from '../__mocks__/create-order-product-dto.mock';

describe('OrderProductService', () => {
  let service: OrderProductService;

  beforeEach(async () => {
    // getting a mock module
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderProductService, orderProductRepositoryMock],
    }).compile();

    // getting order product service mock
    service = module.get<OrderProductService>(OrderProductService);
  });

  describe('Module', () => {
    it('should order product service be defined', () => {
      expect(service).toBeDefined();
    });

    describe('Create', () => {
      describe('create method', () => {
        it('should returned a order product data', async () => {
          const expectedResult: OrderProductEntity = {
            ...orderProductEntityListMock[0],
            productId: createOrderProductDTOMock[0]?.productId,
            orderId: createOrderProductDTOMock[0]?.orderId,
            price: createOrderProductDTOMock[0]?.price,
            amount: createOrderProductDTOMock[0]?.amount,
          };
          jest
            .spyOn(orderProductRepositoryMock.useValue, 'save')
            .mockResolvedValueOnce(expectedResult);
          const orderProduct: OrderProductEntity = await service.create({
            ...orderProductEntityListMock[0],
          });
          expect(orderProduct).toEqual(expectedResult);
        });
        it('should throw a bad request exception', async () => {
          try {
            await service.create({
              productId: undefined,
              orderId: undefined,
              price: 2000,
              amount: 1,
            });
          } catch (err) {
            expect(err.message).toEqual(
              'product id or order id or price or amount was not found it',
            );
          }
        });
        it('should throw an internal error exception', async () => {
          jest
            .spyOn(orderProductRepositoryMock.useValue, 'save')
            .mockRejectedValueOnce(new Error('error on database'));

          try {
            await service.create({
              productId: 1,
              orderId: 1,
              price: 1,
              amount: 1,
            });
          } catch (err) {
            expect(err.message).toEqual('error on database');
          }
        });
      });
    });
  });
});
