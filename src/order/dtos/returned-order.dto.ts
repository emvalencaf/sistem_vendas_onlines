import { IsNumber, IsString } from 'class-validator';
import { OrderEntity } from '../entities/order.entity';
import { ReturnedUserDTO } from '../../user/dtos/returned-user.dto';

export class ReturnedOrderDTO {
  @IsNumber()
  id: number;
  @IsString()
  date: string;
  user?: ReturnedUserDTO;

  constructor({ id, date, user }: OrderEntity) {
    this.id = id;
    this.date = date.toString();
    this.user = user ? new ReturnedUserDTO(user) : undefined;
  }
}
