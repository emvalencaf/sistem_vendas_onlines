import { userEntityListMock } from '../../user/__mocks__/user-entity-list.mock';
import { SignInPayloadDTO } from '../dtos/sign-in-payload.dto';

export const signInPayloadDTOMock: SignInPayloadDTO = {
  id: userEntityListMock[0].id,
  typeUser: userEntityListMock[0].typeUser,
};
