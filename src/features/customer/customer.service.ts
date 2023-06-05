import { Injectable } from '@nestjs/common';
import { PrismaService } from 'lib/prisma/prisma.service';
import { CustomerCreate } from './dto/create-customer.input';
import { CustomerFindUnique } from './dto/customer.input';
import { CustomersFindMany } from './dto/customers.input';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(params: CustomerFindUnique) {
    return await this.prisma.customer.findUnique(params);
  }

  async findAll(params: CustomersFindMany) {
    return await this.prisma.customer.findMany(params);
  }

  async createOne(params: CustomerCreate) {
    return await this.prisma.customer.create(params);
  }
}
