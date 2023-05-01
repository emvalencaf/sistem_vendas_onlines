import { IsString } from 'class-validator';

export class CreateProductDTO {
  @IsString()
  name: string;
}
