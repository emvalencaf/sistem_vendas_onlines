// testings tools
import { Test, TestingModule } from '@nestjs/testing';

// controllers
import { cartProductServiceMock } from '../../cart-product/__mocks__/cart-product-service.mock';

// services

// mocks
import { CartController } from '../cart.controller';
import { cartServiceMock } from '../__mocks__/cart-service.mock';
import { userEntityListMock } from '../../user/__mocks__/user-entity-list.mock';
import { cartEntityListMock } from '../__mocks__/cart-entity-list.mock';
import { ReturnedCartDTO } from '../dtos/returned-cart.dto';
import { DeleteResult } from 'typeorm';
import { productEntityListMock } from '../../product/__mocks__/product-entity-list.mock';
import { updateInCartDTOMock } from '../__mocks__/update-in-cart-dto.mock';
import { insertInCartDTOMock } from '../__mocks__/insert-in-cart-dto.mock';

describe('CartController', () => {
  // controller
  let controller: CartController;

  beforeEach(async () => {
    // get mock module
    const module: TestingModule = await Test.createTestingModule({
      providers: [cartServiceMock, cartProductServiceMock],
      controllers: [CartController],
    }).compile();

    controller = module.get<CartController>(CartController);
  });

  describe('Module', () => {
    it('should defined cart controller', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('Create', () => {
    describe('insertProductIn method', () => {
      it('should returned an active cart', async () => {
        const cart: ReturnedCartDTO = await controller.insertProductIn(
          insertInCartDTOMock,
          userEntityListMock[0].id,
        );

        expect(cart).toEqual(new ReturnedCartDTO(cartEntityListMock[0]));
      });
    });
  });

  describe('Read', () => {
    describe('getByUserId method', () => {
      it('should fetched a cart from user id', async () => {
        const result: ReturnedCartDTO = new ReturnedCartDTO(
          cartEntityListMock[0],
        );
        const cart: ReturnedCartDTO = await controller.getByUserId(
          userEntityListMock[0].id,
        );

        expect(cart).toEqual(result);
      });
    });
  });

  describe('Update', () => {
    describe('updateProductIn', () => {
      it('should updated a cart product amount in activate cart', async () => {
        const result: ReturnedCartDTO = new ReturnedCartDTO(
          cartEntityListMock[0],
        );
        const cart: ReturnedCartDTO = await controller.updateProductIn(
          updateInCartDTOMock,
          userEntityListMock[0].id,
        );

        expect(cart).toEqual(result);
      });
    });
  });

  describe('Delete', () => {
    describe('deleteProductIn', () => {
      it('should delete a product from a active cart', async () => {
        const deleteResult: DeleteResult = await controller.deleteProductIn(
          productEntityListMock[0].id,
          userEntityListMock[0].id,
        );
        expect(deleteResult).toEqual({
          affected: 1,
          raw: [],
        } as DeleteResult);
      });
    });
    describe('clear method', () => {
      it('should desactived a cart of an user', async () => {
        const deleteResult: DeleteResult = await controller.clear(
          userEntityListMock[0].id,
        );
        expect(deleteResult).toEqual({
          affected: 1,
          raw: [],
        } as DeleteResult);
      });
    });
  });
});
