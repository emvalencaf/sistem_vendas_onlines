import { IsString } from 'class-validator';

export class UpdateUserPasswordDTO {
  @IsString()
  newPassword: string;
  @IsString()
  lastPassword: string;
}
