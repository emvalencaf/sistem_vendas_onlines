import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { ProductService } from '../product/product.service';
import { ReturnedCategoryDTO } from './dtos/returned-category.dto';
import { CountProduct } from '../product/dtos/count-product.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
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
  async getAll(): Promise<ReturnedCategoryDTO[]> {
    const categories: CategoryEntity[] = await this.categoryRepository.find();

    if (!categories || categories.length === 0)
      throw new NotFoundException('no categories found in the database');

    const count = await this.productService.countByCategoryId();

    return categories.map(
      (category) =>
        new ReturnedCategoryDTO(
          category,
          this.findAmountProductsIn(category, count),
        ),
    );
  }

  findAmountProductsIn(category: CategoryEntity, countList: CountProduct[]) {
    const count = countList.find(
      (itemCount) => itemCount.category_id === category.id,
    );

    return count ? count.total : 0;
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

  // get a category by id
  async getById(categoryId: number): Promise<CategoryEntity> {
    const category: CategoryEntity = await this.categoryRepository
      .findOne({
        where: {
          id: categoryId,
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

  // check if category exists
  async exist(categoryId: number): Promise<boolean | void> {
    if (
      !(await this.categoryRepository.exist({
        where: {
          id: categoryId,
        },
      }))
    )
      throw new NotFoundException('category doesnt exists');

    return true;
  }
}
