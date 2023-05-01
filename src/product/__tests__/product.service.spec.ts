import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { productRepositoryMock } from '../__mocks__/product-repository.mock';
import { categoryEntityListMock } from '../../category/__mocks__/category-entity-list.mock';
import { productEntityListMock } from '../__mocks__/product-entity-list.mock';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, productRepositoryMock],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should product service be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create', () => {});

  describe('Read', () => {
    describe('getAllFromCategory method', () => {
      it('should returned all products from a category', async () => {
        const result = productEntityListMock.filter(
          (product) => product.categoryId === categoryEntityListMock[0].id,
        );
        jest
          .spyOn(productRepositoryMock.useValue, 'find')
          .mockResolvedValueOnce(result);
        const products = await service.getAllFromCategory(
          categoryEntityListMock[0].id,
        );

        expect(products).toEqual(result);
      });

      it('should throw an error if returned an empety product list', async () => {
        jest
          .spyOn(productRepositoryMock.useValue, 'find')
          .mockResolvedValueOnce([]);

        try {
          await service.getAllFromCategory(categoryEntityListMock[0].id);
        } catch (err) {
          expect(err.message).toEqual('no product found in database');
        }
      });

      it('should throw an error if occorrs an error in database', async () => {
        jest
          .spyOn(productRepositoryMock.useValue, 'find')
          .mockRejectedValueOnce(new Error('error on database'));

        try {
          await service.getAllFromCategory(categoryEntityListMock[0].id);
        } catch (err) {
          expect(err.message).toEqual('error on database');
        }
      });
    });
  });
});
