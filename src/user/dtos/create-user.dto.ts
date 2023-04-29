// decorators
import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

// dto
export class CreateUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  cpf: string;

  @IsString()
  password: string;
}
