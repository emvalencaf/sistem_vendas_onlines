import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from './dtos/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}
  async create({ name }: CreateCategoryDTO): Promise<CategoryEntity> {
    // validations
    if (!name) throw new BadRequestException('name is required');

    if (
      await this.categoryRepository.exist({
        where: {
          name,
        },
      })
    )
      throw new BadRequestException('category already exist');

    const data = {
      name,
    };

    // save on database
    const category: CategoryEntity | undefined = await this.categoryRepository
      .save(data)
      .catch((err) => {
        console.log(err);
        return undefined;
      });

    // exceptions error on database
    if (!category) throw new InternalServerErrorException('error on database');

    // returned data saved on database
    return category;
  }

  // get all categories
  async getAll(): Promise<CategoryEntity[]> {
    const categories: CategoryEntity[] = await this.categoryRepository.find();

    if (!categories || categories.length === 0)
      throw new NotFoundException('no categories found in the database');

    return categories;
  }

  // get a category by name
  async getByName(categoryName: string): Promise<CategoryEntity> {
    const category: CategoryEntity = await this.categoryRepository
      .findOne({
        where: {
          name: categoryName,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException('Database error');
      });

    if (!category)
      throw new NotFoundException('no category found in the database');

    return category;
  }
}
