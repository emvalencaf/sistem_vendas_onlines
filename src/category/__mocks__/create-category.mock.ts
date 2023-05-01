import { CreateCategoryDTO } from '../dtos/create-category.dto';
import { categoryEntityListMock } from './category-entity-list.mock';

export const createCategoryDTOMock: CreateCategoryDTO = {
  name: categoryEntityListMock[0].name,
};
