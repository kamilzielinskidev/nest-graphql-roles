import { A, G } from '@mobily/ts-belt';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Customer } from '@prisma/client';
import { Role } from 'features/customer/role';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[] | undefined>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (G.isNullable(requiredRoles) || A.isEmpty(requiredRoles)) {
      return true;
    }

    // eslint-disable-next-line
    // @ts-ignore
    const { role } = context.user as Customer;

    return requiredRoles.some((requiredRole) => requiredRole === role);
  }
}
