import { userEntityListMock } from '../../user/__mocks__/user-entity-list.mock';
import { AuthService } from '../auth.service';
import { accessTokenMock } from './access-token.mock';
import { returnedSignInDTOMock } from './returned-sign-in.mock';

export const authServiceMock = {
  provide: AuthService,
  useValue: {
    signIn: jest.fn().mockResolvedValue(returnedSignInDTOMock),
    createToken: jest.fn().mockResolvedValue(accessTokenMock),
    validatePassword: jest.fn().mockResolvedValue(true),
    createHashedPassword: jest
      .fn()
      .mockResolvedValue(userEntityListMock[0].password),
  },
};
