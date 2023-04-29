// decorators and utils
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Reflector } from '@nestjs/core';

// services
import { JwtService } from '@nestjs/jwt';

// dtos
import { SignInPayloadDTO } from '../auth/dtos/sign-in-payload.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    // get from request an access token
    const { authorization } = context.switchToHttp().getRequest();

    // validate the access token
    const signInPayload: SignInPayloadDTO | undefined = await this.jwtService
      .verifyAsync(authorization, { secret: process.env.JWT_SECRET })
      .catch(() => undefined);

    if (!signInPayload) return false;

    // check if user is role user
    return requiredRoles.some((role) => role === signInPayload.typeUser);
  }
}
