import { Test, TestingModule } from '@nestjs/testing';
import { productServiceMock } from '../__mocks__/product-service.mock';
import { ProductController } from '../product.controller';
import { ReturnedProductDTO } from '../dtos/returned-product.dto';
import { categoryEntityListMock } from '../../category/__mocks__/category-entity-list.mock';
import { productEntityListMock } from '../__mocks__/product-entity-list.mock';
import { ProductEntity } from '../entity/product.entity';
import { updateProductDTOMock } from '../__mocks__/update-product-dto.mock';
import { partialUpdateProductDTOMock } from '../__mocks__/partial-update-product.mock';
import { createProductDTOMock } from '../__mocks__/create-product-dto.mock';

describe('CartController', () => {
  // controller
  let controller: ProductController;

  beforeEach(async () => {
    // get mock module
    const module: TestingModule = await Test.createTestingModule({
      providers: [productServiceMock],
      controllers: [ProductController],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  describe('Module', () => {
    it('should defined product controller', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('Create', () => {
    describe('create method', () => {
      it('should created a new product', async () => {
        const expectedResult: ProductEntity = {
          ...productEntityListMock[0],
          ...createProductDTOMock,
        };
        const product: ProductEntity = await controller.create(
          createProductDTOMock,
        );
        expect(product).toEqual(expectedResult);
      });
    });
  });

  describe('Read', () => {
    describe('getAllFromCategory method', () => {
      it('should returned all products from a category', async () => {
        const expectedResult: ReturnedProductDTO[] = productEntityListMock
          .filter(
            (product) => product.categoryId === categoryEntityListMock[0].id,
          )
          .map((product) => new ReturnedProductDTO(product));
        const products: ReturnedProductDTO[] =
          await controller.getAllFromCategory(categoryEntityListMock[0].id);
        expect(products).toEqual(expectedResult);
      });
    });
  });

  describe('Update', () => {
    describe('update method', () => {
      it('should updated a product', async () => {
        const expectedResult: ProductEntity = {
          ...productEntityListMock[0],
          ...updateProductDTOMock,
        };
        const updatedProduct: ProductEntity = await controller.update(
          updateProductDTOMock,
          productEntityListMock[0].id,
        );
        expect(updatedProduct).toEqual(expectedResult);
      });
    });

    describe('partialUpdate method', () => {
      it('should partial updated a product', async () => {
        const expectedResult: ProductEntity = {
          ...productEntityListMock[0],
          ...partialUpdateProductDTOMock,
        };
        const updatedProduct: ProductEntity = await controller.partialUpdate(
          partialUpdateProductDTOMock,
          productEntityListMock[0].id,
        );

        expect(updatedProduct).toEqual(expectedResult);
      });
    });
  });

  describe('Delete', () => {
    describe('delete method', () => {
      it('should returned true when deleted a product', async () => {
        const deleteResult: boolean = await controller.delete(
          productEntityListMock[0].id,
        );
        expect(deleteResult).toEqual(true);
      });
    });
  });
});
