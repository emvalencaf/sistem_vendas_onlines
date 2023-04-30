import { userEntityListMock } from '../../user/__mocks__/user-entity-list.mock';
import { ReturnedSignInDTO } from '../dtos/returned-sign-in.dto';
import { accessTokenMock } from './access-token.mock';

export const returnedSignInDTOMock: ReturnedSignInDTO = {
  accessToken: accessTokenMock,
  user: userEntityListMock[0],
};
