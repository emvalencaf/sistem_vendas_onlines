import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryEntity } from '../entity/category.entity';
import { categoryEntityListMock } from './category-entity-list.mock';

export const categoryRepositoryMock = {
  provide: getRepositoryToken(CategoryEntity),
  useValue: {
    find: jest.fn().mockResolvedValue(categoryEntityListMock),
    exist: jest.fn().mockResolvedValue(false),
    findOne: jest.fn().mockResolvedValue(categoryEntityListMock[0]),
    save: jest.fn().mockResolvedValue(categoryEntityListMock[0]),
  },
};
