import { G } from '@mobily/ts-belt';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { getContextHeader } from 'lib/graphql-nest-integration/getContextHeader';
import { parseAuthorizationHeader } from 'lib/jwt/helpers';
import { JwtService } from 'lib/jwt/jwt.service';
import { PrismaService } from 'lib/prisma/prisma.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const authorizationHeader = getContextHeader(context)('authorization');

    if (G.isNullable(authorizationHeader)) {
      return false;
    }

    try {
      const token = parseAuthorizationHeader(authorizationHeader);
      const { id } = this.jwtService.validate(token);

      const customer = await this.prismaService.customer.findUnique({ where: { id } });

      if (G.isNullable(customer)) {
        return false;
      }

      // eslint-disable-next-line
      // @ts-ignore
      context.user = customer; // ugly way of nestjs sharing context https://docs.nestjs.com/security/authentication#implementing-the-authentication-guard

      return true;
    } catch (e) {
      return false;
    }
  }
}
