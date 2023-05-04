import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from '../cart.service';
import { cartRepositoryMock } from '../__mocks__/cart-repository.mock';
import { cartProductServiceMock } from '../../cart-product/__mocks__/cart-product-service.mock';
import { CartEntity } from '../entity/cart.entity';
import { cartEntityListMock } from '../__mocks__/cart-entity-list.mock';
import { DeleteResult } from 'typeorm';
import { insertInCartDTOMock } from '../__mocks__/insert-in-cart-dto.mock';
import { userEntityListMock } from '../../user/__mocks__/user-entity-list.mock';

describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService, cartRepositoryMock, cartProductServiceMock],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  describe('Module', () => {
    it('should cart service be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('Create', () => {
    describe('create method', () => {
      it('should created a cart', async () => {
        const cart: CartEntity = await service.create(
          cartEntityListMock[0].userId,
        );

        expect(cart).toEqual(cartEntityListMock[0]);
      });

      it('should throw an error on database', async () => {
        jest
          .spyOn(cartRepositoryMock.useValue, 'save')
          .mockResolvedValueOnce(cartEntityListMock[0]);
        try {
          await service.create(cartEntityListMock[0].userId);
        } catch (err) {
          expect(err.message).toEqual('error on database');
        }
      });
    });
    describe('inserProductIn', () => {
      it('should created a new active cart', async () => {
        const cart: CartEntity = await service.insertProductIn(
          insertInCartDTOMock,
          cartEntityListMock[0].userId,
        );

        expect(cart).toEqual(cartEntityListMock[0]);
      });
    });
  });

  describe('Read', () => {
    describe('getById method', () => {
      it('should fetched a cart by id', async () => {
        const cart: CartEntity = await service.getById(
          cartEntityListMock[0].id,
        );
        expect(cart).toEqual(cartEntityListMock[0]);
      });
      it('should throw an error cause cart wasnt found it', async () => {
        jest
          .spyOn(cartRepositoryMock.useValue, 'findOne')
          .mockResolvedValueOnce(undefined);
        try {
          await service.getById(cartEntityListMock[0].id);
        } catch (err) {
          expect(err.message).toEqual('no cart was found in database');
        }
      });
    });
    describe('getByUserId method', () => {
      it('should fetched an active cart by user id', async () => {
        const cart: CartEntity = await service.getById(
          cartEntityListMock[0].userId,
        );
        expect(cart).toEqual(cartEntityListMock[0]);
      });
      it('should thrown an error cause car wasnt found it', async () => {
        jest
          .spyOn(cartRepositoryMock.useValue, 'findOne')
          .mockResolvedValueOnce(undefined);
        try {
          await service.getByUserId(cartEntityListMock[0].userId);
        } catch (err) {
          expect(err.message).toEqual('no cart was found in database');
        }
      });
    });
  });

  describe('Update', () => {
    describe('updaterProductIn method', () => {
      it('should updated the amount of cart product in cart', async () => {
        const cart: CartEntity = await service.insertProductIn(
          insertInCartDTOMock,
          cartEntityListMock[0].userId,
        );

        expect(cart).toEqual(cartEntityListMock[0]);
      });
    });
  });

  describe('Delete', () => {
    describe('deleteProductIn method', () => {
      it('should delete a cart product in cart', async () => {
        const result: DeleteResult = {
          affected: 1,
          raw: [],
        };
        jest
          .spyOn(service, 'getByUserId')
          .mockResolvedValueOnce(cartEntityListMock[0]);

        const deleteResult: DeleteResult = await service.deleteProductIn(
          insertInCartDTOMock.productId,
          cartEntityListMock[0].userId,
        );

        expect(deleteResult).toEqual(result);
      });
      it('should throw an error when cart is not found it', async () => {
        jest
          .spyOn(service, 'getByUserId')
          .mockRejectedValueOnce(new Error('no cart was found in database'));

        try {
          await service.deleteProductIn(
            insertInCartDTOMock.productId,
            cartEntityListMock[0].userId,
          );
        } catch (err) {
          expect(err.message).toEqual('no cart was found in database');
        }
      });
    });
    describe('clear method', () => {
      it('should clear cart making inacteved', async () => {
        const result: DeleteResult = { affected: 1, raw: [] };
        jest
          .spyOn(cartRepositoryMock.useValue, 'save')
          .mockResolvedValueOnce(result);

        const deleteResult: DeleteResult = await service.clear(
          cartEntityListMock[0].userId,
        );

        expect(deleteResult).toEqual(result);
      });
      it('should throw an error on database', async () => {
        jest
          .spyOn(cartRepositoryMock.useValue, 'save')
          .mockResolvedValueOnce(new Error('error on database'));

        try {
          await service.clear(cartEntityListMock[0].userId);
        } catch (err) {
          expect(err.message).toEqual('error on database');
        }
      });

      it('should throw an error cause cart wasnt found it', async () => {
        jest
          .spyOn(service, 'getByUserId')
          .mockRejectedValueOnce(new Error('no cart was found in database'));

        try {
          await service.clear(cartEntityListMock[0].userId);
        } catch (err) {
          expect(err.message).toEqual('no cart was found in database');
        }
      });
    });
  });
});
