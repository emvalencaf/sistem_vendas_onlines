import { categoryEntityListMock } from '../../category/__mocks__/category-entity-list.mock';
import { cityEntityListMock } from '../../city/__mocks__/city-entity-list.mock';
import { ProductService } from '../product.service';
import { countProductMock } from './count-product.mock';
import { createProductDTOMock } from './create-product-dto.mock';
import { partialUpdateProductDTOMock } from './partial-update-product.mock';
import { productEntityListMock } from './product-entity-list.mock';
import { updateProductDTOMock } from './update-product-dto.mock';

export const productServiceMock = {
  provide: ProductService,
  useValue: {
    exist: jest.fn().mockResolvedValue(true),
    getAllFromCategory: jest
      .fn()
      .mockResolvedValue(
        productEntityListMock.filter(
          (product) => product.categoryId === categoryEntityListMock[0].id,
        ),
      ),
    create: jest.fn().mockResolvedValue({
      ...productEntityListMock[0],
      ...createProductDTOMock,
    }),
    update: jest.fn().mockResolvedValue({
      ...productEntityListMock[0],
      ...updateProductDTOMock,
    }),
    partialUpdate: jest.fn().mockResolvedValue({
      ...productEntityListMock[0],
      ...partialUpdateProductDTOMock,
    }),
    getById: jest.fn().mockResolvedValue(cityEntityListMock[0]),
    delete: jest.fn().mockResolvedValue(true),
    findAll: jest.fn().mockResolvedValue(productEntityListMock),
    countByCategoryId: jest.fn().mockResolvedValue([countProductMock]),
  },
};
