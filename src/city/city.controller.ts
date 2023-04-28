// decorators
import { Controller, Get, Param } from '@nestjs/common';

// services
import { CityService } from './city.service';

// entities
import { CityEntity } from './entity/city.entity';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  // get all cities by a state id
  @Get('/:stateId')
  async getAllByStateId(
    @Param('stateId') stateId: number,
  ): Promise<CityEntity[]> {
    return this.cityService.getAllByStateId(stateId);
  }
}
