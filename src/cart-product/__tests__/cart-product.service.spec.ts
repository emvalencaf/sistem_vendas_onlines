// testing tools
import { Test, TestingModule } from '@nestjs/testing';
// services
import { CartProductService } from '../cart-product.service';

// mocks
import { cartProductRepositoryMock } from '../__mocks__/cart-product-repository.mock';
import { productServiceMock } from '../../product/__mocks__/product-service.mock';
import { productEntityListMock } from '../../product/__mocks__/product-entity-list.mock';
import { cartEntityListMock } from '../../cart/__mocks__/cart-entity-list.mock';
import { cartProductEntityListMock } from '../__mocks__/cart-product-entity-list.mock';
import { CartProductEntity } from '../entity/cart-product.entity';
import { insertInCartDTOMock } from '../../cart/__mocks__/insert-in-cart-dto.mock';
import { productRepositoryMock } from '../../product/__mocks__/product-repository.mock';
import { DeleteResult } from 'typeorm';

describe('CartProductService', () => {
  // cart product service var
  let service: CartProductService;

  beforeEach(async () => {
    // create a cart product module mock
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartProductService,
        cartProductRepositoryMock,
        productServiceMock,
      ],
    }).compile();

    service = module.get<CartProductService>(CartProductService);
  });

  describe('Module', () => {
    it('should cart product service be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('Create', () => {
    describe('create method', () => {
      it('should created a card product', async () => {
        const cartProduct: CartProductEntity = await service.create(
          insertInCartDTOMock,
          cartEntityListMock[0].id,
        );
        expect(cartProduct).toEqual(cartProductEntityListMock[0]);
      });
      it('should throw an error when product doesnt exist', async () => {
        jest
          .spyOn(productServiceMock.useValue, 'exist')
          .mockResolvedValueOnce(false);
        try {
          await service.create(insertInCartDTOMock, cartEntityListMock[0].id);
        } catch (err) {
          expect(err.message).toEqual('product doesnt exists');
        }
      });
      it('should throw an error when occors an error on database', async () => {
        jest
          .spyOn(cartProductRepositoryMock.useValue, 'save')
          .mockRejectedValueOnce(new Error('error on database'));

        try {
          await service.create(insertInCartDTOMock, cartEntityListMock[0].id);
        } catch (err) {
          expect(err.message).toEqual('error on database');
        }
      });
    });
    describe('insertProductIn method', () => {
      it('should updated the amount of cart product', async () => {
        const result: CartProductEntity = {
          ...cartProductEntityListMock[0],
          amount: 5,
        };
        jest
          .spyOn(productRepositoryMock.useValue, 'exist')
          .mockResolvedValueOnce(true);
        jest
          .spyOn(cartProductRepositoryMock.useValue, 'save')
          .mockResolvedValueOnce(result);

        const cartProduct: CartProductEntity = await service.insertProductIn(
          { ...insertInCartDTOMock, amount: 5 },
          cartEntityListMock[0].id,
        );

        expect(cartProduct).toEqual(result);
      });
      it('should create a new cart product when cart product doesnt exists', async () => {
        jest
          .spyOn(cartProductRepositoryMock.useValue, 'exist')
          .mockResolvedValueOnce(false);
        jest
          .spyOn(service, 'create')
          .mockResolvedValueOnce(cartProductEntityListMock[0]);
        const cartProduct: CartProductEntity = await service.insertProductIn(
          insertInCartDTOMock,
          cartEntityListMock[0].id,
        );
        expect(cartProduct).toEqual(cartProductEntityListMock[0]);
      });
      it('should throw an error when product doesnt exists', async () => {
        jest
          .spyOn(productServiceMock.useValue, 'exist')
          .mockResolvedValueOnce(false);
        try {
          await service.insertProductIn(
            insertInCartDTOMock,
            cartEntityListMock[0].id,
          );
        } catch (err) {
          expect(err.message).toEqual('product doesnt exists');
        }
      });
      it('should throw an db error when updating the amount of cart product', async () => {
        jest
          .spyOn(productRepositoryMock.useValue, 'exist')
          .mockResolvedValueOnce(true);
        jest
          .spyOn(cartProductRepositoryMock.useValue, 'save')
          .mockRejectedValueOnce(new Error('error on database'));
        try {
          await service.insertProductIn(
            insertInCartDTOMock,
            cartEntityListMock[0].id,
          );
        } catch (err) {
          expect(err.message).toEqual('error on database');
        }
      });
    });
  });

  describe('Read', () => {
    describe('getByProductIdAndCartId method', () => {
      it('should fetched a cart product', async () => {
        const cartProduct: CartProductEntity =
          await service.getByProductIdAndCartId(
            productEntityListMock[0].id,
            cartEntityListMock[0].id,
          );
        expect(cartProduct).toEqual(cartProductEntityListMock[0]);
      });

      it('should throw an error cause wasnt find on db', async () => {
        jest
          .spyOn(cartProductRepositoryMock.useValue, 'findOne')
          .mockResolvedValueOnce(undefined);

        try {
          await service.exist(
            productEntityListMock[0].id,
            cartEntityListMock[0].id,
          );
        } catch (err) {
          expect(err.message).toEqual(
            'no product was found related these cart id',
          );
        }
      });
    });

    describe('exist method', () => {
      it('should return a true value', async () => {
        const isExist: boolean = await service.exist(
          productEntityListMock[0].id,
          cartEntityListMock[0].id,
        );

        expect(isExist).toEqual(true);
      });

      it('should throw an error cause wasnt find on db', async () => {
        jest
          .spyOn(cartProductRepositoryMock.useValue, 'exist')
          .mockResolvedValueOnce(false);

        try {
          await service.exist(
            productEntityListMock[0].id,
            cartEntityListMock[0].id,
          );
        } catch (err) {
          expect(err.message).toEqual('cart product doesnt exists');
        }
      });

      it('should throw an error cause db error', async () => {
        jest
          .spyOn(cartProductRepositoryMock.useValue, 'exist')
          .mockRejectedValueOnce(new Error('error on database'));
        try {
          await service.exist(
            productEntityListMock[0].id,
            cartEntityListMock[0].id,
          );
        } catch (err) {
          expect(err.message).toEqual('error on database');
        }
      });
    });
  });

  describe('Update', () => {
    describe('updateProductIn method', () => {
      it('should updated cart product', async () => {
        const result: CartProductEntity = {
          ...cartProductEntityListMock[0],
          amount: 1,
        };
        jest
          .spyOn(productServiceMock.useValue, 'exist')
          .mockResolvedValueOnce(true);
        jest.spyOn(service, 'exist').mockResolvedValueOnce(true);
        jest
          .spyOn(cartProductRepositoryMock.useValue, 'save')
          .mockResolvedValueOnce(result);
        jest
          .spyOn(service, 'getByProductIdAndCartId')
          .mockResolvedValueOnce(cartProductEntityListMock[0]);

        const cartProduct: CartProductEntity = await service.updateProductIn(
          { ...insertInCartDTOMock, amount: 1 },
          cartEntityListMock[0].id,
        );

        expect(cartProduct).toEqual(result);
      });
      it('should thrown an error when occors error on database', async () => {
        jest
          .spyOn(productServiceMock.useValue, 'exist')
          .mockResolvedValueOnce(true);
        jest
          .spyOn(service, 'getByProductIdAndCartId')
          .mockResolvedValueOnce(cartProductEntityListMock[0]);
        jest.spyOn(service, 'exist').mockResolvedValueOnce(true);
        jest
          .spyOn(cartProductRepositoryMock.useValue, 'save')
          .mockRejectedValueOnce(new Error('error on database'));

        try {
          await service.updateProductIn(
            insertInCartDTOMock,
            cartEntityListMock[0].id,
          );
        } catch (err) {
          expect(err.message).toEqual('error on database');
        }
      });
      it('should thrown an error when product doesnt exists', async () => {
        jest
          .spyOn(productServiceMock.useValue, 'exist')
          .mockRejectedValueOnce(new Error('product doesnt exists'));
        try {
          await service.updateProductIn(
            insertInCartDTOMock,
            cartEntityListMock[0].id,
          );
        } catch (err) {
          expect(err.message).toEqual('product doesnt exists');
        }
      });
      it('should thrown an error when cart product doesnt exists', async () => {
        jest
          .spyOn(productServiceMock.useValue, 'exist')
          .mockResolvedValueOnce(true);
        jest
          .spyOn(service, 'exist')
          .mockRejectedValueOnce(new Error('cart product doesnt exists'));
        try {
          await service.updateProductIn(
            insertInCartDTOMock,
            cartEntityListMock[0].id,
          );
        } catch (err) {
          expect(err.message).toEqual('cart product doesnt exists');
        }
      });
    });
  });

  describe('Delete', () => {
    describe('deleteProductIn', () => {
      it('should deleted a cart product', async () => {
        const result: DeleteResult = {
          affected: 1,
          raw: [],
        };
        jest.spyOn(service, 'exist').mockResolvedValueOnce(true);

        const deleteResult: DeleteResult = await service.deleteProductIn(
          productEntityListMock[0].id,
          cartEntityListMock[0].id,
        );

        expect(deleteResult).toEqual(result);
      });

      it('should thrown an error when not found cart product', async () => {
        jest
          .spyOn(service, 'exist')
          .mockRejectedValueOnce(new Error('cart product doesnt exists'));
        try {
          await service.deleteProductIn(
            productEntityListMock[0].id,
            cartEntityListMock[0].id,
          );
        } catch (err) {
          expect(err.message).toEqual('cart product doesnt exists');
        }
      });

      it('should thrown an error on db', async () => {
        jest.spyOn(service, 'exist').mockResolvedValueOnce(true);
        jest
          .spyOn(cartProductRepositoryMock.useValue, 'delete')
          .mockRejectedValueOnce(new Error('error on database'));
        try {
          await service.deleteProductIn(
            productEntityListMock[0].id,
            cartEntityListMock[0].id,
          );
        } catch (err) {
          expect(err.message).toEqual('error on database');
        }
      });
    });
  });
});
