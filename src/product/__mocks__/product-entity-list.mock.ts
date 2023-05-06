import { categoryEntityListMock } from '../../category/__mocks__/category-entity-list.mock';
import { ProductEntity } from '../entities/product.entity';

export const productEntityListMock: ProductEntity[] = [
  {
    id: 1,
    name: 'product mock 1',
    categoryId: categoryEntityListMock[0].id,
    price: 0.01,
    image: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'product mock 2',
    categoryId: categoryEntityListMock[0].id,
    price: 0.01,
    image: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: 'product mock 3',
    categoryId: categoryEntityListMock[0].id,
    price: 0.01,
    image: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 1,
    name: 'product mock',
    categoryId: categoryEntityListMock[1].id,
    price: 0.01,
    image: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
