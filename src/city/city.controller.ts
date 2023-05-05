// decorators
import { Controller, Get, Param } from '@nestjs/common';

// services
import { CityService } from './city.service';

// dtos
import { ReturnedCityDTO } from './dtos/returned-city.dto';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  // get all cities by a state id
  @Get('/:stateId')
  async getAllByStateId(
    @Param('stateId') stateId: number,
  ): Promise<ReturnedCityDTO[]> {
    return (await this.cityService.getAllByStateId(stateId)).map(
      (city) => new ReturnedCityDTO(city),
    );
  }
}
