import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from '../cart.service';
import { cartRepositoryMock } from '../__mocks__/cart-repository.mock';
import { cartProductServiceMock } from '../../cart-product/__mocks__/cart-product-service.mock';
import { CartEntity } from '../entity/cart.entity';
import { cartEntityListMock } from '../__mocks__/cart-entity-list.mock';

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
});
