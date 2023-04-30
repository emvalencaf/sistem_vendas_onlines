// testing tools
import { Test, TestingModule } from '@nestjs/testing';

// services
import { AuthService } from '../auth.service';

// dtos
import { ReturnedSignInDTO } from '../dtos/returned-sign-in.dto';

// mocks
import { userServiceMock } from '../../user/__mocks__/user-service.mock';
import { jwtServiceMock } from '../__mocks__/jwt-service.mock';
import { signInPayloadDTOMock } from '../__mocks__/sign-in-payload-dto.mock';
import { accessTokenMock } from '../__mocks__/access-token.mock';
import { signInDTOMock } from '../__mocks__/sign-in-dto.mock';
import { returnedSignInDTOMock } from '../__mocks__/returned-sign-in.mock';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    // getting auth module
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, userServiceMock, jwtServiceMock],
    }).compile();

    // getting auth, user and jwt services
    service = module.get<AuthService>(AuthService);
  });
  it('should auth service be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Token', () => {
    it('should create a valid token', async () => {
      const accessToken: string = await service.createToken(
        signInPayloadDTOMock,
      );

      expect({ accessToken }).toEqual({ accessToken: accessTokenMock });
    });
  });

  describe('Authentication', () => {
    it('should sign in an user', async () => {
      const returnedSignIn: ReturnedSignInDTO = await service.signIn(
        signInDTOMock,
      );

      expect(returnedSignIn).toEqual(returnedSignInDTOMock);
    });
    it('should throw an error when try to sign in with invalid password and a valid email', async () => {
      expect(
        service.signIn({
          email: signInDTOMock.email,
          password: '1029mfe',
        }),
      ).rejects.toThrowError();
    });
    it('should throw an error when try to sign in with valid password and a invalid email', async () => {
      jest
        .spyOn(userServiceMock.useValue, 'getByEmail')
        .mockRejectedValue(new Error());
      expect(
        service.signIn({
          email: 'JOAQUIMask@gmail.com',
          password: signInDTOMock.password,
        }),
      ).rejects.toThrowError();
    });
  });
});
