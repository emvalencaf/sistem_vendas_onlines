import { categoryEntityListMock } from '../../category/__mocks__/category-entity-list.mock';
import { CountProductDTO } from '../dtos/count-product.dto';

export const countProductMock: CountProductDTO = {
  category_id: categoryEntityListMock[0].id,
  total: 4,
};
