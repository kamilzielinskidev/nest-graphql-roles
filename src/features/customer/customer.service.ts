import { G } from '@mobily/ts-belt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'lib/prisma/prisma.service';
import { CreateCustomer } from './dto/create-customer.input';
import { FindManyCustomers } from './dto/find-many-customers.input';
import { WhereUniqueCustomer } from './dto/where-unique-customer.input';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(input: WhereUniqueCustomer) {
    return await this.prisma.customer.findUnique({ where: input });
  }

  async findAll(input: FindManyCustomers) {
    return await this.prisma.customer.findMany(input);
  }

  async createOne(input: CreateCustomer) {
    const customer = await this.prisma.customer.findUnique({ where: { email: input.email } });

    if (G.isNotNullable(customer)) {
      throw new BadRequestException('Bad request');
    }

    return await this.prisma.customer.create({ data: input });
  }

  async deleteOne(input: WhereUniqueCustomer) {
    return await this.prisma.customer.delete({ where: input });
  }
}
