import { Controller, Get, Param } from '@nestjs/common';
import { CorreioService } from './correio.service';

@Controller('correios')
export class CorreioController {
  constructor(private readonly correiosService: CorreioService) {}
  // get cep
  @Get(':cep')
  async findAll(@Param('cep') cep: string): Promise<any> {
    return this.correiosService.getByCEP(cep);
  }
}
