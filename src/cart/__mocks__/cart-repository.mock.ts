import { CartEntity } from '../entity/cart.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

export const cartRepositoryMock = {
  provide: getRepositoryToken(CartEntity),
  useValue: {
    save: jest.fn(),
  },
};
