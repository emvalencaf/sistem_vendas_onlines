import { countProductDTOMock } from '../../product/__mocks__/count-product.mock';
import { CategoryService } from '../category.service';
import { ReturnedCategoryDTO } from '../dtos/returned-category.dto';
import { categoryEntityListMock } from './category-entity-list.mock';

export const categoryServiceMock = {
  provide: CategoryService,
  useValue: {
    exist: jest.fn().mockResolvedValue(true),
    getByName: jest.fn().mockResolvedValue(categoryEntityListMock[0]),
    getById: jest.fn().mockResolvedValue(categoryEntityListMock[0]),
    getAll: jest
      .fn()
      .mockResolvedValue(
        categoryEntityListMock.map(
          (category) =>
            new ReturnedCategoryDTO(
              category,
              countProductDTOMock.find(
                (countProduct) => category.id === countProduct.category_id,
              ).total,
            ),
        ),
      ),
    create: jest.fn().mockResolvedValue(categoryEntityListMock[0]),
  },
};
