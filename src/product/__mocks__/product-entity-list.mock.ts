import { ProductEntity } from '../entity/product.entity';

export const productEntityListMock: ProductEntity[] = [
  {
    id: 1,
    name: 'product mock 1',
    categoryId: 1,
    price: 0.01,
    image: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'product mock 2',
    categoryId: 1,
    price: 0.01,
    image: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: 'product mock 3',
    categoryId: 1,
    price: 0.01,
    image: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 1,
    name: 'product mock',
    categoryId: 2,
    price: 0.01,
    image: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
