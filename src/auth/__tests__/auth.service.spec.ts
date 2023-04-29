import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
import { userServiceMock } from '../../user/__mocks__/user-service.mock';
import { AuthService } from '../auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { jwtServiceMock } from '../__mocks__/jwt-service.mock';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    // getting auth module
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, userServiceMock, jwtServiceMock],
    }).compile();

    // getting auth, user and jwt services
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });
  it('should auth, user and jwt service be defined', () => {
    expect(authService).toBeDefined();
    expect(userService).toBeDefined();
    expect(jwtService).toBeDefined();
  });
});
