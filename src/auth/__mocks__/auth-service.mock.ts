import { AuthService } from '../auth.service';
import { accessTokenMock } from './access-token.mock';
import { returnedSignInDTOMock } from './returned-sign-in.mock';

export const jwtServiceMock = {
  provide: AuthService,
  useValue: {
    signIn: jest.fn().mockResolvedValue(returnedSignInDTOMock),
    createToken: jest.fn().mockResolvedValue(accessTokenMock),
  },
};
