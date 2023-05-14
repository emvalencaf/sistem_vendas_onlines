import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDTO {
  @IsString()
  name: string;
  @IsNumber()
  price: number;
  @IsString()
  image: string;
  @IsNumber()
  categoryId: number;

  @IsNumber()
  weight: number;

  @IsNumber()
  length: number;

  @IsNumber()
  width: number;

  @IsNumber()
  height: number;

  @IsNumber()
  diameter: number;
}
