import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { type GetCustomerInput } from './dto/customer.input';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(params: GetCustomerInput) {
    const { skip, take, cursor, where } = params;

    return await this.prisma.customer.findMany({
      skip,
      take,
      cursor,
      where,
    });
  }
}
