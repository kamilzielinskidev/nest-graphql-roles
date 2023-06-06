import { G } from '@mobily/ts-belt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { BcryptService } from 'lib/bcrypt/bcrypt.service';
import { PrismaService } from 'lib/prisma/prisma.service';
import { CreateAuth } from './dto/create-auth.input';
import { FindManyCustomers } from './dto/find-many-customers.input';
import { WhereUniqueCustomer } from './dto/where-unique-customer.input';
import { JwtService } from 'lib/jwt/jwt.service';

@Injectable()
export class CustomerService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}

  async findOne(input: WhereUniqueCustomer) {
    return await this.prismaService.customer.findUnique({ where: input });
  }

  async findAll(input: FindManyCustomers) {
    return await this.prismaService.customer.findMany(input);
  }

  async createOne(input: CreateAuth) {
    const customer = await this.prismaService.customer.findUnique({ where: { email: input.email } });

    if (G.isNotNullable(customer)) {
      throw new BadRequestException('Bad request');
    }

    const hashedPassword = this.bcryptService.hash(input.password);

    const { id } = await this.prismaService.customer.create({
      data: { email: input.email, password: hashedPassword },
    });

    return this.jwtService.sign({ id });
  }

  async deleteOne(input: WhereUniqueCustomer) {
    return await this.prismaService.customer.delete({ where: input });
  }
}
