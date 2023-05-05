import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ReturnedCategoryDTO } from './dtos/returned-category.dto';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../enums/user-types.enum';
import { CreateCategoryDTO } from './dtos/create-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  async getAll(): Promise<ReturnedCategoryDTO[]> {
    return (await this.categoryService.getAll()).map(
      (category) => new ReturnedCategoryDTO(category),
    );
  }

  @Roles(UserType.Admin)
  @Post()
  async create(
    @Body() { name }: CreateCategoryDTO,
  ): Promise<ReturnedCategoryDTO> {
    return new ReturnedCategoryDTO(await this.categoryService.create({ name }));
  }
}
