import { G } from '@mobily/ts-belt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { BcryptService } from 'lib/bcrypt/bcrypt.service';
import { JwtService } from 'lib/jwt/jwt.service';
import { PrismaService } from 'lib/prisma/prisma.service';
import { CreateAuth } from './dto/create-auth.input';
import * as Role from '../customer/models/role';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}

  async registerOne(input: CreateAuth) {
    const customer = await this.prismaService.customer.findUnique({ where: { email: input.email } });

    if (G.isNotNullable(customer)) {
      throw new BadRequestException('Bad request');
    }

    const hashedPassword = this.bcryptService.hash(input.password);

    const { id, role } = await this.prismaService.customer.create({
      data: { email: input.email, password: hashedPassword },
    });

    return this.jwtService.sign({ id, role: Role.from(role) });
  }

  async authenticateOne(input: CreateAuth) {
    const customer = await this.prismaService.customer.findUnique({ where: { email: input.email } });

    if (G.isNullable(customer)) {
      throw new BadRequestException('Bad request');
    }

    const { id, password, role } = customer;

    if (!this.bcryptService.compare(input.password, password)) {
      throw new BadRequestException('Bad request');
    }

    return this.jwtService.sign({ id, role: Role.from(role) });
  }
}
