import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PartialUpdateProductDTO {
  @IsString()
  @IsOptional()
  name?: string;
  @IsNumber()
  @IsOptional()
  price?: number;
  @IsString()
  @IsOptional()
  image?: string;
  @IsNumber()
  @IsOptional()
  categoryId?: number;
}
