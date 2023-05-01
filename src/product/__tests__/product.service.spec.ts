import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { productRepositoryMock } from '../__mocks__/product-repository.mock';
import { categoryEntityListMock } from '../../category/__mocks__/category-entity-list.mock';
import { productEntityListMock } from '../__mocks__/product-entity-list.mock';
import { createProductDTOMock } from '../__mocks__/create-product-dto.mock';
import { categoryServiceMock } from '../../category/__mocks__/category-service.mock';
import { ProductEntity } from '../entity/product.entity';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, categoryServiceMock, productRepositoryMock],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should product service be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    it('should create a product (create method)', async () => {
      const result: ProductEntity = productEntityListMock[0];

      jest
        .spyOn(productRepositoryMock.useValue, 'save')
        .mockResolvedValueOnce(result);

      const product = await service.create(createProductDTOMock);

      expect(product).toEqual(result);
    });

    it('should throw an error if wasnt fill the required fields (create method)', async () => {
      jest
        .spyOn(productRepositoryMock.useValue, 'save')
        .mockRejectedValueOnce(
          new Error('name, price, image and category are required'),
        );

      try {
        await service.create({ ...createProductDTOMock, name: undefined });
      } catch (err) {
        expect(err.message).toEqual(
          'name, price, image and category are required',
        );
      }
    });

    it('should throw an error if the category doesnt exists (create method)', async () => {
      jest
        .spyOn(categoryServiceMock.useValue, 'exist')
        .mockRejectedValueOnce(new Error('category doesnt exist'));

      try {
        await service.create(createProductDTOMock);
      } catch (err) {
        expect(err.message).toEqual('category doesnt exist');
      }
    });

    it('should throw an error if occors an error in database while creating (create method)', async () => {
      jest
        .spyOn(productRepositoryMock.useValue, 'save')
        .mockRejectedValueOnce(new Error('error on database'));

      try {
        await service.create(createProductDTOMock);
      } catch (err) {
        expect(err.message).toEqual('error on database');
      }
    });
	/*
    it('should created a product (create method)', async () => {
      const result: ProductEntity = productEntityListMock[0];

      jest
        .spyOn(productRepositoryMock.useValue, 'save')
        .mockResolvedValueOnce(result);

      const product = await service.create(createProductDTOMock);

      expect(product).toEqual(result);
    });

    it('should throw an error if category doesnt exist', async () => {
      jest
        .spyOn(categoryServiceMock.useValue, 'exist')
        .mockRejectedValueOnce(new Error('category doesnt exists'));

      try {
        await service.create(createProductDTOMock);
      } catch (err) {
        expect(err.message).toEqual('category doesnt exists');
      }
    });

    it('should throw an error if wasnt fill the required fields (create method)', async () => {
      jest
        .spyOn(productRepositoryMock.useValue, 'save')
        .mockRejectedValueOnce(
          new Error('name, price, image and caregory are required'),
        );

      try {
        await service.create(createProductDTOMock);
      } catch (err) {
        expect(err.message).toEqual(
          'name, price, image and category are required',
        );
      }
    });

    it('should throw an error if occors an error in database while creating a product (create method)', async () => {
      jest
        .spyOn(productRepositoryMock.useValue, 'save')
        .mockResolvedValueOnce(undefined);

      try {
        await service.create(createProductDTOMock);
      } catch (err) {
        expect(err.message).toEqual('error on database');
      }
    });*/
  });

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
