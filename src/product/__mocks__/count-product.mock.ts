import { categoryEntityListMock } from '../../category/__mocks__/category-entity-list.mock';
import { CountProductDTO } from '../dtos/count-product.dto';

export const countProductDTOMock: CountProductDTO[] =
  categoryEntityListMock.map((category) => ({
    category_id: category.id,
    total: category.products ? category.products.length : 1,
  }));
