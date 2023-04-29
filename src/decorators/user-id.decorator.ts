import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { authorizationToSignInPayload } from '../utils/base-64-converter';

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const { authorization } = ctx.switchToHttp().getRequest().headers;

  // get signInPayload from token
  const signInPayload = authorizationToSignInPayload(authorization);

  return signInPayload?.id;
});
