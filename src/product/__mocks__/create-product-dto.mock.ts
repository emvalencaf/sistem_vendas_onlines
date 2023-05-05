import { categoryEntityListMock } from '../../category/__mocks__/category-entity-list.mock';
import { CreateProductDTO } from '../dtos/create-product.dto';

export const createProductDTOMock: CreateProductDTO = {
  name: 'product mock 1',
  categoryId: categoryEntityListMock[0].id,
  price: 0.01,
  image: 'image',
};
