import { Test, TestingModule } from '@nestjs/testing';
import { cityServiceMock } from '../__mocks__/city-service.mock';
import { CityController } from '../city.controller';
import { ReturnedCityDTO } from '../dtos/returned-city.dto';
import { stateEntityListMock } from '../../state/__mocks__/state-entity-list.mock';
import { cityEntityListMock } from '../__mocks__/city-entity-list.mock';

describe('CityController', () => {
  // controller
  let controller: CityController;

  beforeEach(async () => {
    // get mock module
    const module: TestingModule = await Test.createTestingModule({
      providers: [cityServiceMock],
      controllers: [CityController],
    }).compile();

    controller = module.get<CityController>(CityController);
  });

  describe('Module', () => {
    it('should defined city controller', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('Read', () => {
    describe('getAllByStateId method', () => {
      it('should fetched all cities from a state id', async () => {
        const expectedResult: ReturnedCityDTO[] = cityEntityListMock
          .filter((city) => city.stateId === stateEntityListMock[0].id)
          .map((city) => new ReturnedCityDTO(city));
        const cities: ReturnedCityDTO[] = await controller.getAllByStateId(
          stateEntityListMock[0].id,
        );
        expect(cities).toEqual(expectedResult);
      });
    });
  });
});
