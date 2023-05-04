import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from '../address.controller';
import { addressServiceMock } from '../__mocks__/address-service.mock';
import { createAddressDTOMock } from '../__mocks__/address-create-dto.mock';
import { userEntityListMock } from '../../user/__mocks__/user-entity-list.mock';
import { addressEntityListMock } from '../__mocks__/address-entity-list.mock';
import { userServiceMock } from '../../user/__mocks__/user-service.mock';
import { cityServiceMock } from '../../city/__mocks__/city-service.mock';
import { AddressEntity } from '../entity/address.entity';
import { ReturnedAddressDTO } from '../dtos/returned-address.dto';

describe('AddressController', () => {
  // controller
  let controller: AddressController;

  beforeEach(async () => {
    // get mock module
    const module: TestingModule = await Test.createTestingModule({
      providers: [addressServiceMock, userServiceMock, cityServiceMock],
      controllers: [AddressController],
    }).compile();

    controller = module.get<AddressController>(AddressController);
  });

  describe('Module', () => {
    it('should defined address controller', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('Create', () => {
    describe('create method', () => {
      it('should created an address entinty', async () => {
        const address = await controller.create(
          createAddressDTOMock,
          userEntityListMock[0].id,
        );
        expect(address).toEqual(addressEntityListMock[0]);
      });
    });
  });

  describe('Read', () => {
    describe('getAllFromUser method', () => {
      it('should returned all addresses related to an user id', async () => {
        const result: ReturnedAddressDTO[] = addressEntityListMock
          .filter((address) => address.userId === userEntityListMock[0].id)
          .map((address) => new ReturnedAddressDTO(address));
        const addresses: ReturnedAddressDTO[] = await controller.getAllFromUser(
          userEntityListMock[0].id,
        );

        expect(addresses).toEqual(result);
      });
    });
  });
});
