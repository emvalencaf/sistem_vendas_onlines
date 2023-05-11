import { Test, TestingModule } from '@nestjs/testing';
import { categoryServiceMock } from '../__mocks__/category-service.mock';
import { CategoryController } from '../category.controller';
import { categoryEntityListMock } from '../__mocks__/category-entity-list.mock';
import { ReturnedCategoryDTO } from '../dtos/returned-category.dto';
import { createCategoryDTOMock } from '../__mocks__/create-category.mock';
import { countProductDTOMock } from '../../product/__mocks__/count-product.mock';

describe('CategoryController', () => {
  // controller
  let controller: CategoryController;

  beforeEach(async () => {
    // get mock module
    const module: TestingModule = await Test.createTestingModule({
      providers: [categoryServiceMock],
      controllers: [CategoryController],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  describe('Module', () => {
    it('should defined category controller', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('Create', () => {
    describe('create method', () => {
      it('should created a category', async () => {
        const expectedResult: ReturnedCategoryDTO = new ReturnedCategoryDTO(
          categoryEntityListMock[0],
        );
        const category: ReturnedCategoryDTO = await controller.create(
          createCategoryDTOMock,
        );
        expect(category).toEqual(expectedResult);
      });
    });
  });

  describe('Read', () => {
    describe('getAll method', () => {
      it('should returned all categories', async () => {
        const result: ReturnedCategoryDTO[] = categoryEntityListMock.map(
          (category) =>
            new ReturnedCategoryDTO(
              category,
              countProductDTOMock.find(
                (count) => count.category_id === category.id,
              ).total,
            ),
        );
        const categories: ReturnedCategoryDTO[] = await controller.getAll();

        expect(categories).toEqual(result);
      });
    });
  });
});
