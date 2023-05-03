import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from '../cart.service';
import { cartRepositoryMock } from '../__mocks__/cart-repository.mock';

describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService, cartRepositoryMock],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('should cart service be defined', () => {
    expect(service).toBeDefined();
  });
});
