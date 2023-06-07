import { Injectable } from '@nestjs/common';
import { JwtService } from 'lib/jwt/jwt.service';
import { PrismaService } from 'lib/prisma/prisma.service';
import { FindManyCustomers } from './dto/find-many-customers.input';
import { WhereUniqueCustomer } from './dto/where-unique-customer.input';

@Injectable()
export class CustomerService {
  constructor(private readonly prismaService: PrismaService, private readonly jwtService: JwtService) {}

  async findMe(token: string) {
    const { id } = this.jwtService.decode(token);

    return await this.prismaService.customer.findUnique({ where: { id } });
  }

  async findOne(input: WhereUniqueCustomer) {
    return await this.prismaService.customer.findUnique({ where: input });
  }

  async findAll(input: FindManyCustomers) {
    return await this.prismaService.customer.findMany(input);
  }

  async deleteOne(input: WhereUniqueCustomer) {
    return await this.prismaService.customer.delete({ where: input });
  }
}
