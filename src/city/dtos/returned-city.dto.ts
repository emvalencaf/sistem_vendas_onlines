// dtos
import { ReturnedStateDTO } from '../../state/dtos/returned-state.dto';

// entities
import { CityEntity } from '../entity/city.entity';

export class ReturnedCityDTO {
  name: string;
  state?: ReturnedStateDTO;
  constructor(city: CityEntity) {
    this.name = city.name;
    this.state = city.state ? new ReturnedStateDTO(city.state) : undefined;
  }
}
