import { Controller, Get } from '@nestjs/common';
import { StateService } from './state.service';
import { StateEntity } from './entities/state.entity';

@Controller('states')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  // get all states
  @Get()
  async getAll(): Promise<StateEntity[]> {
    return this.stateService.getAll();
  }
}
