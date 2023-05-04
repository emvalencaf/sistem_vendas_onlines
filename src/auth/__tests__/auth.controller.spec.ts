// testing tools
import { Test, TestingModule } from '@nestjs/testing';

// controllers
import { AuthController } from '../auth.controller';

// services
import { authServiceMock } from '../__mocks__/auth-service.mock';
import { userServiceMock } from '../../user/__mocks__/user-service.mock';
// dtos
import { signInDTOMock } from '../__mocks__/sign-in-dto.mock';
import { returnedSignInDTOMock } from '../__mocks__/returned-sign-in.mock';
import { ReturnedSignInDTO } from '../dtos/returned-sign-in.dto';

describe('AuthController', () => {
  // controller
  let controller: AuthController;

  beforeEach(async () => {
    // get mock module
    const module: TestingModule = await Test.createTestingModule({
      providers: [authServiceMock, userServiceMock],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('Module', () => {
    it('should defined auth controller', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('Read', () => {
    describe('signIn method', () => {
      it('should sign in an user', async () => {
        const signedUser: ReturnedSignInDTO = await controller.signIn(
          signInDTOMock,
        );

        expect(signedUser).toEqual(returnedSignInDTOMock);
      });
    });
  });
});
