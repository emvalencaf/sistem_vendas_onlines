import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('categories')
export class ProductController {
  constructor(private readonly categoryService: ProductService) {}
}
