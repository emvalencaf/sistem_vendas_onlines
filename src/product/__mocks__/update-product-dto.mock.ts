import { categoryEntityListMock } from '../../category/__mocks__/category-entity-list.mock';
import { UpdateProductDTO } from '../dtos/update-product.dto';

export const updateProductDTOMock: UpdateProductDTO = {
  name: 'new name',
  price: 20,
  image: 'src/image/2',
  categoryId: categoryEntityListMock[1].id,
  weight: 10,
  diameter: 10,
  height: 10,
  length: 10,
  width: 10,
};
