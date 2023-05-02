import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductEntity } from '../entity/product.entity';
import { productEntityListMock } from './product-entity-list.mock';

export const productRepositoryMock = {
  provide: getRepositoryToken(ProductEntity),
  useValue: {
    find: jest.fn().mockResolvedValue(productEntityListMock),
    save: jest.fn().mockResolvedValue(productEntityListMock[0]),
    exist: jest.fn().mockResolvedValue(true),
    findOne: jest.fn().mockResolvedValue(productEntityListMock[0]),
    delete: jest.fn().mockResolvedValue(true),
    update: jest.fn().mockResolvedValue({
      affected: 1,
      raw: {},
    }),
  },
};
