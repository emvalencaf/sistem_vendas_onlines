import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { userServiceMock } from '../__mocks__/user-service.mock';
import { ReturnedUserDTO } from '../dtos/returned-user.dto';
import { userEntityListMock } from '../__mocks__/user-entity-list.mock';
import { createUserDTOMock } from '../__mocks__/user-create-dto.mock';
import { UserEntity } from '../entity/user.entity';

describe('UserController', () => {
  // controller
  let controller: UserController;

  beforeEach(async () => {
    // get mock module
    const module: TestingModule = await Test.createTestingModule({
      providers: [userServiceMock],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  describe('Module', () => {
    it('should defined user controller', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('Create', () => {
    describe('create method', () => {
      it('should create an user', async () => {
        const expectedResult: UserEntity = {
          ...userEntityListMock[0],
          ...createUserDTOMock,
        };
        const user: UserEntity = await controller.create(createUserDTOMock);

        expect(user).toEqual(expectedResult);
      });
    });
  });

  describe('Read', () => {
    describe('getById method', () => {
      it('should returned a user data', async () => {
        const expectedResult: ReturnedUserDTO = new ReturnedUserDTO(
          userEntityListMock[0],
        );
        const user: ReturnedUserDTO = await controller.getById(
          userEntityListMock[0].id,
        );

        expect(user).toEqual(expectedResult);
      });
    });
    describe('getAll', () => {
      it('should returned all users', async () => {
        const expectedResult: ReturnedUserDTO[] = userEntityListMock.map(
          (user) => new ReturnedUserDTO(user),
        );

        const users: ReturnedUserDTO[] = await controller.getAll();

        expect(users).toEqual(expectedResult);
      });
    });
  });
});
