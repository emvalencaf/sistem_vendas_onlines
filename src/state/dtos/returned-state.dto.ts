// entities
import { StateEntity } from '../entity/state.entity';

export class ReturnedStateDTO {
  name: string;
  constructor(state: StateEntity) {
    this.name = state.name;
  }
}
