import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductEntity } from '../entity/product.entity';
import { productEntityListMock } from './product-entity-list.mock';

export const productRepositoryMock = {
  provide: getRepositoryToken(ProductEntity),
  useValue: {
    find: jest.fn().mockResolvedValue(productEntityListMock),
  },
};
