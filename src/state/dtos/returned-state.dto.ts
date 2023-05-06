// entities
import { StateEntity } from '../entities/state.entity';

export class ReturnedStateDTO {
  name: string;
  constructor(state: StateEntity) {
    this.name = state.name;
  }
}
