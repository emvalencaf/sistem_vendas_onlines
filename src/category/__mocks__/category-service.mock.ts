import { CategoryService } from '../category.service';
import { categoryEntityListMock } from './category-entity-list.mock';

export const categoryServiceMock = {
  provide: CategoryService,
  useValue: {
    exist: jest.fn().mockResolvedValue(true),
    getByName: jest.fn().mockResolvedValue(categoryEntityListMock[0]),
    getById: jest.fn().mockResolvedValue(categoryEntityListMock[0]),
    getAll: jest.fn().mockResolvedValue(categoryEntityListMock),
    create: jest.fn().mockResolvedValue(categoryEntityListMock[0]),
  },
};
