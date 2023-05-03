import { ProductService } from '../product.service';

export const productServiceMock = {
  provide: ProductService,
  useValue: {
    exist: jest.fn().mockResolvedValue(true),
  },
};
