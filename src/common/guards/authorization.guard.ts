import { A, D, G, O, pipe } from '@mobily/ts-belt';
import { CanActivate, ExecutionContext, Injectable, mixin } from '@nestjs/common';
import * as Role from 'features/customer/models/role';
import { getContextHeader } from 'lib/graphql-nest-integration/getContextHeader';
import { parseAuthorizationHeader } from 'lib/jwt/helpers';
import { JwtService } from 'lib/jwt/jwt.service';

export const AuthorizationGuard = (roles: Role.Role[]) => {
  @Injectable()
  class AuthorizationGuardMixin implements CanActivate {
    constructor(public readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext) {
      if (G.isNullable(roles) || A.isEmpty(roles)) {
        return true;
      }

      const authorizationHeader = O.fromExecution(() => getContextHeader(context)('authorization'));

      if (O.isNone(authorizationHeader)) {
        return false;
      }

      const role = pipe(
        O.fromExecution(() => parseAuthorizationHeader(authorizationHeader)),
        O.map((v) => this.jwtService.validate(v)),
        O.flatMap(D.get('role')),
        O.map(Role.from),
      );

      if (O.isNone(role) || role === Role.Role.UNAUTHENTICATED || !A.includes(roles, role)) {
        return false;
      }

      return true;
    }
  }

  return mixin(AuthorizationGuardMixin);
};
