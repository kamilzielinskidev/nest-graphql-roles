import { G } from '@mobily/ts-belt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Customer } from 'src/features/customer/models/customer.model';
import { CustomerService } from './customer.service';
import { CustomerCreate } from './dto/create-customer.input';
import { CustomerFindUnique } from './dto/customer.input';
import { CustomersFindMany } from './dto/customers.input';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => Customer)
  async customer(@Args('data') args: CustomerFindUnique) {
    const {
      where: { id, email },
    } = args;

    if (G.isNullable(id) && G.isNullable(email)) {
      throw new HttpException('Id or email required.', HttpStatus.BAD_REQUEST);
    }

    return await this.customerService.findOne(args);
  }

  @Query(() => [Customer])
  async customers(@Args('data') args: CustomersFindMany) {
    return await this.customerService.findAll(args);
  }

  @Mutation(() => Customer)
  async createCustomer(@Args('data') args: CustomerCreate) {
    return await this.customerService.createOne(args);
  }
}
