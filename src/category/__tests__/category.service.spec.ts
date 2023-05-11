import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';
import { categoryRepositoryMock } from '../__mocks__/category-repository.mock';
import { CategoryEntity } from '../entity/category.entity';
import { categoryEntityListMock } from '../__mocks__/category-entity-list.mock';
import { createCategoryDTOMock } from '../__mocks__/create-category.mock';
import { productServiceMock } from '../../product/__mocks__/product-service.mock';
import { ReturnedCategoryDTO } from '../dtos/returned-category.dto';
import { CountProductDTO } from '../../product/dtos/count-product.dto';
describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, categoryRepositoryMock, productServiceMock],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should service category be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    describe('create method', () => {
      it('should create a category (create method)', async () => {
        const result: CategoryEntity = categoryEntityListMock[0];

        jest
          .spyOn(categoryRepositoryMock.useValue, 'save')
          .mockResolvedValueOnce(result);

        const category = await service.create(createCategoryDTOMock);

        expect(category).toEqual(result);
      });

      it('should throw an error if wasnt fill the required fields (create method)', async () => {
        jest
          .spyOn(categoryRepositoryMock.useValue, 'save')
          .mockRejectedValueOnce(new Error('name is required'));

        try {
          await service.create({
            name: undefined,
          });
        } catch (err) {
          expect(err.message).toEqual('name is required');
        }
      });

      it('should throw an error if already exists a category with the same name (create method)', async () => {
        jest
          .spyOn(categoryRepositoryMock.useValue, 'exist')
          .mockRejectedValueOnce(new Error('category already exist'));

        try {
          await service.create(createCategoryDTOMock);
        } catch (err) {
          expect(err.message).toEqual('category already exist');
        }
      });

      it('should throw an error if occors an error in database while creating a category (create method)', async () => {
        jest
          .spyOn(categoryRepositoryMock.useValue, 'save')
          .mockRejectedValueOnce(new Error('error on database'));

        try {
          await service.create(createCategoryDTOMock);
        } catch (err) {
          expect(err.message).toEqual('error on database');
        }
      });
    });
  });
  describe('Read', () => {
    describe('getAll method', () => {
      it('should returned an list of categories', async () => {
        const countMock: CountProductDTO[] = categoryEntityListMock.map(
          (category) => ({
            category_id: category.id,
            total: 5,
          }),
        );

        const expectedResult: ReturnedCategoryDTO[] =
          categoryEntityListMock.map(
            (category) =>
              new ReturnedCategoryDTO(
                category,
                countMock.find(
                  (countProduct) => category.id === countProduct.category_id,
                ).total,
              ),
          );

        jest
          .spyOn(productServiceMock.useValue, 'countByCategoryId')
          .mockResolvedValueOnce(countMock);

        jest
          .spyOn(categoryRepositoryMock.useValue, 'find')
          .mockResolvedValueOnce(categoryEntityListMock);

        const categories: ReturnedCategoryDTO[] = await service.getAll();

        expect(categories).toEqual(expectedResult);
      });

      it('should throw an error when fetch an empety list of categories', async () => {
        jest
          .spyOn(categoryRepositoryMock.useValue, 'find')
          .mockResolvedValueOnce([]);

        try {
          await service.getAll();
        } catch (err) {
          expect(err.message).toEqual('no categories found in the database');
        }
      });

      it('should throw an error when occours a db error', async () => {
        jest
          .spyOn(categoryRepositoryMock.useValue, 'find')
          .mockRejectedValueOnce(new Error('Database error'));

        try {
          await service.getAll();
        } catch (err) {
          expect(err.message).toEqual('Database error');
        }
      });
    });

    describe('getByName method', () => {
      it('should return a category', async () => {
        const category: CategoryEntity = await service.getByName(
          categoryEntityListMock[0].name,
        );

        expect(category).toEqual(categoryEntityListMock[0]);
      });

      it('should throw an error when fetch a no category', async () => {
        jest
          .spyOn(categoryRepositoryMock.useValue, 'findOne')
          .mockResolvedValueOnce(undefined);

        try {
          await service.getByName(categoryEntityListMock[0].name);
        } catch (err) {
          expect(err.message).toEqual('no category found in the database');
        }
      });

      it('should throw an error when occours a db error', async () => {
        jest
          .spyOn(categoryRepositoryMock.useValue, 'findOne')
          .mockRejectedValueOnce(new Error('Database error'));

        try {
          await service.getByName(undefined);
        } catch (err) {
          expect(err.message).toEqual('Database error');
        }
      });
    });

    describe('getById method', () => {
      it('should return a category', async () => {
        const category: CategoryEntity = await service.getById(
          categoryEntityListMock[0].id,
        );

        expect(category).toEqual(categoryEntityListMock[0]);
      });

      it('should throw an error when fetch a no category', async () => {
        jest
          .spyOn(categoryRepositoryMock.useValue, 'findOne')
          .mockResolvedValueOnce(undefined);

        try {
          await service.getById(categoryEntityListMock[0].id);
        } catch (err) {
          expect(err.message).toEqual('no category found in the database');
        }
      });

      it('should throw an error when occours a db error', async () => {
        jest
          .spyOn(categoryRepositoryMock.useValue, 'findOne')
          .mockRejectedValueOnce(new Error('Database error'));

        try {
          await service.getById(undefined);
        } catch (err) {
          expect(err.message).toEqual('Database error');
        }
      });
    });

    describe('exist method', () => {
      it('should returned a boolean value true', async () => {
        jest
          .spyOn(categoryRepositoryMock.useValue, 'exist')
          .mockResolvedValue(true);

        expect(await service.exist(categoryEntityListMock[0].id)).toEqual(true);
      });

      it('should throw an error when not found it a category', async () => {
        jest
          .spyOn(categoryRepositoryMock.useValue, 'exist')
          .mockResolvedValue(false);

        try {
          await service.exist(categoryEntityListMock[0].id);
        } catch (err) {
          expect(err.message).toEqual('category doesnt exists');
        }
      });
    });
  });
});
