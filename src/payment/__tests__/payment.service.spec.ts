import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from '../payment.service';
import { paymentRepositoryMock } from '../__mocks__/payment-repository.mock';
import { productEntityListMock } from '../../product/__mocks__/product-entity-list.mock';
import { cartEntityListMock } from '../../cart/__mocks__/cart-entity-list.mock';
import { createOrderListDTOMock } from '../../order/__mocks__/create-order-list-dto.mock';
import { paymentEntityListMock } from '../__mocks__/payment-entity-list.mock';
import { PaymentEntity } from '../entities/payment.entity';
import { CartEntity } from '../../cart/entities/cart.entity';
import { cartProductEntityListMock } from '../../cart-product/__mocks__/cart-product-entity-list.mock';
import { ProductEntity } from '../../product/entities/product.entity';
import { PaymentCreditCardEntity } from '../entities/payment-credit-card.entity';
import { PaymentPixEntity } from '../entities/payment-pix.entity';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    // getting payment module
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService, paymentRepositoryMock],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  describe('Module', () => {
    it('should payment service be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('Create', () => {
    describe('create method', () => {
      const cart: CartEntity = {
        ...cartEntityListMock[0],
        cartProducts: cartProductEntityListMock,
      };
      const products: ProductEntity[] = productEntityListMock.filter(
        (product) =>
          product.id ===
          cart.cartProducts.find(
            (cartProduct) => cartProduct.productId === product.id,
          ).id,
      );
      const expectedPrice = cart.cartProducts
        .map((cartProduct) => {
          // get related product
          const product: ProductEntity = products.find(
            (product) => product.id === cartProduct.productId,
          );

          // calculating the amount of cart product and product price
          if (product) return cartProduct.amount * product.price;

          // if no product was found it, returns 0
          return 0;
        })
        .reduce((accumulater, currentValue) => accumulater + currentValue, 0);
      it('should returned an credit card payment data', async () => {
        const expectedResult: PaymentCreditCardEntity = {
          ...paymentEntityListMock[0],
          amountPayment: createOrderListDTOMock[0].amountPayment,
          price: expectedPrice,
        };

        jest
          .spyOn(paymentRepositoryMock.useValue, 'save')
          .mockResolvedValueOnce(expectedResult);
        const payment: PaymentEntity = await service.create(
          createOrderListDTOMock[0],
          productEntityListMock,
          cartEntityListMock[0],
        );

        expect(payment).toEqual(expectedResult);
      });
      it('should returned an pix payment data', async () => {
        const expectedResult: PaymentPixEntity = {
          ...paymentEntityListMock[0],
          code: createOrderListDTOMock[1].code,
          datePayment: new Date(createOrderListDTOMock[1].datePayment),
          price: expectedPrice,
        };

        jest
          .spyOn(paymentRepositoryMock.useValue, 'save')
          .mockResolvedValueOnce(expectedResult);
        const payment: PaymentEntity = await service.create(
          createOrderListDTOMock[0],
          productEntityListMock,
          cartEntityListMock[0],
        );

        expect(payment).toEqual(expectedResult);
      });
      it('should throw a internal server error exception when try to create a credit card payment', async () => {
        jest
          .spyOn(paymentRepositoryMock.useValue, 'save')
          .mockRejectedValueOnce(new Error('error on database'));
        try {
          await service.create(
            {
              amountPayment: 8,
            },
            productEntityListMock,
            cartEntityListMock[0],
          );
        } catch (err) {
          expect(err.message).toEqual('error on database');
        }
      });
      it('should throw a internal server error exception when try to create a pix payment', async () => {
        jest
          .spyOn(paymentRepositoryMock.useValue, 'save')
          .mockRejectedValueOnce(new Error('error on database'));
        try {
          await service.create(
            {
              code: 'isajdasd',
              datePayment: '20-09-2022',
            },
            productEntityListMock,
            cartEntityListMock[0],
          );
        } catch (err) {
          expect(err.message).toEqual('error on database');
        }
      });
      it('should throw a bad request exception', async () => {
        try {
          await service.create(
            {
              code: undefined,
              datePayment: undefined,
              amountPayment: undefined,
            },
            productEntityListMock,
            cartEntityListMock[0],
          );
        } catch (err) {
          expect(err.message).toEqual(
            'Amount payment or code pix and date payment not found',
          );
        }
      });
    });
  });

  describe('Utils', () => {
    describe('calculatingTotalPrice', () => {
      it('should returned a total price 0', () => {
        const expectedResult = 0;
        const result: number = service.calculatingTotalPrice([], []);
        expect(result).toEqual(expectedResult);
        const expectedResult2 = 0;
        const result2: number = service.calculatingTotalPrice(
          [],
          cartProductEntityListMock,
        );
        expect(result2).toEqual(expectedResult2);
      });
      it('should returned 15500 (sums of all products prices into cart product - check the mocks)', () => {
        const expectedResult = 15500;
        const result: number = service.calculatingTotalPrice(
          productEntityListMock.filter(
            (product) =>
              product.id ===
              cartProductEntityListMock.find(
                (cartProduct) => cartProduct.productId === product.id,
              ).productId,
          ),
          cartProductEntityListMock,
        );
        expect(result).toEqual(expectedResult);
      });
    });
  });
});
