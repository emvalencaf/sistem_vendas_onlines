import { Module } from '@nestjs/common';
import { CorreioService } from './correio.service';
import { HttpModule } from '@nestjs/axios';
import { CityModule } from '../city/city.module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    CityModule,
  ],
  controllers: [],
  providers: [CorreioService],
  exports: [],
})
export class CorreioModule {}
