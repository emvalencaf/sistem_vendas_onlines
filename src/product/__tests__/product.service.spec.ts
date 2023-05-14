import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { productRepositoryMock } from '../__mocks__/product-repository.mock';
import { categoryEntityListMock } from '../../category/__mocks__/category-entity-list.mock';
import { productEntityListMock } from '../__mocks__/product-entity-list.mock';
import { createProductDTOMock } from '../__mocks__/create-product-dto.mock';
import { categoryServiceMock } from '../../category/__mocks__/category-service.mock';
import { ProductEntity } from '../entities/product.entity';
import { updateProductDTOMock } from '../__mocks__/update-product-dto.mock';
import { partialUpdateProductDTOMock } from '../__mocks__/partial-update-product.mock';
import { UpdateResult } from 'typeorm';
import { ReturnedCategoryDTO } from '../../category/dtos/returned-category.dto';
import { correioServiceMock } from '../../correios/__mocks__/correio-service.mock';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        correioServiceMock,
        categoryServiceMock,
        productRepositoryMock,
      ],
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

    describe('getById method', () => {
      it('should return a product data', async () => {
        const result: ProductEntity = productEntityListMock[0];

        jest
          .spyOn(productRepositoryMock.useValue, 'findOne')
          .mockResolvedValueOnce(result);

        const product = await service.getById(productEntityListMock[0].id);

        expect(product).toEqual(result);
      });

      it('should throw a error when no product is find it', async () => {
        jest
          .spyOn(productRepositoryMock.useValue, 'findOne')
          .mockResolvedValueOnce(undefined);

        try {
          await service.getById(productEntityListMock[0].id);
        } catch (err) {
          expect(err.message).toEqual('no product found in the database');
        }
      });

      it('should throw a error when occors an error on db', async () => {
        jest
          .spyOn(productRepositoryMock.useValue, 'findOne')
          .mockRejectedValueOnce(new Error('error on database'));

        try {
          await service.getById(productEntityListMock[0].id);
        } catch (err) {
          expect(err.message).toEqual('error on database');
        }
      });
    });

    describe('exist method', () => {
      it('should returned a boolean value true', async () => {
        jest
          .spyOn(productRepositoryMock.useValue, 'exist')
          .mockResolvedValue(true);

        expect(await service.exist(categoryEntityListMock[0].id)).toEqual(true);
      });

      it('should throw an error when not found it a category', async () => {
        jest
          .spyOn(productRepositoryMock.useValue, 'exist')
          .mockResolvedValue(false);

        try {
          await service.exist(productEntityListMock[0].id);
        } catch (err) {
          expect(err.message).toEqual('product doesnt exists');
        }
      });
      it('should throw an error when occours an error on database', async () => {
        jest
          .spyOn(productRepositoryMock.useValue, 'exist')
          .mockRejectedValueOnce(new Error('error on database'));
        try {
          await service.exist(productEntityListMock[0].id);
        } catch (err) {
          expect(err.message).toEqual('error on database');
        }
      });
    });

    describe('findAll method', () => {
      it('should return all products in databse', async () => {
        jest
          .spyOn(productRepositoryMock.useValue, 'find')
          .mockResolvedValueOnce(productEntityListMock);

        const products: ProductEntity[] = await service.findAll();

        expect(products).toEqual(products);
      });

      it('should return a list of products get by a list of ids', async () => {
        const listProductId: number[] = [1, 2, 3];
        const expectedResult: ProductEntity[] = productEntityListMock.filter(
          (product) =>
            product.id === listProductId.find((id) => id === product.id),
        );
        jest
          .spyOn(productRepositoryMock.useValue, 'find')
          .mockResolvedValueOnce(expectedResult);

        const products: ProductEntity[] = await service.findAll(listProductId);

        expect(products).toEqual(expectedResult);
      });

      it('should return a product with relations', async () => {
        const expectedResult = productEntityListMock.map((product) => ({
          ...product,
          category: new ReturnedCategoryDTO(
            categoryEntityListMock.find(
              (category) => category.id === product.categoryId,
            ),
          ),
        }));

        jest
          .spyOn(productRepositoryMock.useValue, 'find')
          .mockResolvedValueOnce(expectedResult);

        const products = await service.findAll(undefined, true);

        expect(products).toEqual(expectedResult);
      });

      it('should throw a not found exception', async () => {
        jest
          .spyOn(productRepositoryMock.useValue, 'find')
          .mockResolvedValueOnce([]);

        try {
          await service.findAll();
        } catch (err) {
          expect(err.message).toEqual('no product found in database');
        }
      });
    });
  });

  describe('Delete', () => {
    describe('delete method', () => {
      it('should delete a product by id', async () => {
        jest.spyOn(service, 'exist').mockResolvedValueOnce(true);
        jest
          .spyOn(productRepositoryMock.useValue, 'delete')
          .mockResolvedValueOnce(true);

        const isDelete: boolean | undefined = await service.delete(
          productEntityListMock[0].id,
        );

        expect(isDelete).toEqual(true);
      });

      it('should throw an error when product is not found it', async () => {
        jest
          .spyOn(service, 'exist')
          .mockRejectedValueOnce(new Error('product doesnt exists'));

        try {
          await service.delete(productEntityListMock[0].id);
        } catch (err) {
          expect(err.message).toEqual('product doesnt exists');
        }
      });
    });
  });

  describe('Update', () => {
    describe('Partial Update method', () => {
      it('should update a product', async () => {
        const result: ProductEntity = {
          ...productEntityListMock[0],
          ...updateProductDTOMock,
        };
        jest.spyOn(service, 'exist').mockResolvedValueOnce(true);
        jest
          .spyOn(productRepositoryMock.useValue, 'update')
          .mockResolvedValueOnce({
            affected: 1,
            raw: {},
          } as UpdateResult);
        jest.spyOn(service, 'getById').mockResolvedValueOnce(result);

        const product: ProductEntity = await service.update(
          updateProductDTOMock,
          productEntityListMock[0].id,
        );

        expect(product).toEqual(result);
      });
      it('should throw an error because no product was found it', async () => {
        jest
          .spyOn(productRepositoryMock.useValue, 'exist')
          .mockResolvedValueOnce(false);

        try {
          await service.partialUpdate(
            partialUpdateProductDTOMock,
            productEntityListMock[0].id,
          );
        } catch (err) {
          expect(err.message).toEqual('product doesnt exists');
        }
      });
      it('should throw an error because an error on database occours', async () => {
        jest.spyOn(service, 'exist').mockResolvedValueOnce(true);
        jest
          .spyOn(productRepositoryMock.useValue, 'update')
          .mockResolvedValueOnce({
            affected: 0,
            raw: {},
          });

        try {
          await service.partialUpdate(
            partialUpdateProductDTOMock,
            productEntityListMock[0].id,
          );
        } catch (err) {
          expect(err.message).toEqual('error on database');
        }

        jest.spyOn(service, 'exist').mockResolvedValueOnce(true);
        jest
          .spyOn(productRepositoryMock.useValue, 'update')
          .mockRejectedValueOnce(new Error('error on database'));

        try {
          await service.partialUpdate(
            partialUpdateProductDTOMock,
            productEntityListMock[0].id,
          );
        } catch (err) {
          expect(err.message).toEqual('error on database');
        }
      });
    });

    describe('Update method', () => {
      it('should update a product', async () => {
        const result: ProductEntity = {
          ...productEntityListMock[0],
          ...updateProductDTOMock,
        };
        jest.spyOn(service, 'exist').mockResolvedValueOnce(true);
        jest
          .spyOn(productRepositoryMock.useValue, 'update')
          .mockResolvedValueOnce({
            affected: 1,
            raw: {},
          } as UpdateResult);
        jest.spyOn(service, 'getById').mockResolvedValueOnce(result);

        const product: ProductEntity = await service.update(
          updateProductDTOMock,
          productEntityListMock[0].id,
        );

        expect(product).toEqual(result);
      });
      it('should throw an error because no product was found it', async () => {
        jest
          .spyOn(productRepositoryMock.useValue, 'exist')
          .mockResolvedValueOnce(false);

        try {
          await service.update(
            updateProductDTOMock,
            productEntityListMock[0].id,
          );
        } catch (err) {
          expect(err.message).toEqual('product doesnt exists');
        }
      });
      it('should throw an error because an error on database occours', async () => {
        jest.spyOn(service, 'exist').mockResolvedValueOnce(true);
        jest
          .spyOn(productRepositoryMock.useValue, 'update')
          .mockResolvedValueOnce({
            affected: 0,
            raw: {},
          });

        try {
          await service.update(
            updateProductDTOMock,
            productEntityListMock[0].id,
          );
        } catch (err) {
          expect(err.message).toEqual('error on database');
        }

        jest.spyOn(service, 'exist').mockResolvedValueOnce(true);
        jest
          .spyOn(productRepositoryMock.useValue, 'update')
          .mockRejectedValueOnce(new Error('error on database'));

        try {
          await service.update(
            updateProductDTOMock,
            productEntityListMock[0].id,
          );
        } catch (err) {
          expect(err.message).toEqual('error on database');
        }
      });
      it('should throw an error because bad request', async () => {
        jest.spyOn(service, 'exist').mockResolvedValueOnce(true);
        jest
          .spyOn(productRepositoryMock.useValue, 'update')
          .mockRejectedValueOnce(
            new Error(
              'name, price, image, category and product details are required',
            ),
          );

        try {
          await service.update(
            { ...updateProductDTOMock, name: undefined },
            productEntityListMock[0].id,
          );
        } catch (err) {
          expect(err.message).toEqual(
            'name, price, image, category and product details are required',
          );
        }
      });
    });
  });
});
