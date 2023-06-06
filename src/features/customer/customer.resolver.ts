import { UsePipes } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Customer } from 'src/features/customer/models/customer.model';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { CustomerService } from './customer.service';
import { CreateCustomer, createCustomerSchema } from './dto/create-customer.input';
import { FindManyCustomers } from './dto/find-many-customers.input';
import { WhereUniqueCustomer, whereUniqueSchemaCustomer } from './dto/where-unique-customer.input';

@Resolver()
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => Customer)
  @UsePipes(new ZodValidationPipe(whereUniqueSchemaCustomer))
  async customer(
    @Args('data')
    args: WhereUniqueCustomer,
  ) {
    return await this.customerService.findOne(args);
  }

  @Query(() => [Customer])
  async customers(@Args('data') args: FindManyCustomers) {
    return await this.customerService.findAll(args);
  }

  @Mutation(() => Customer)
  @UsePipes(new ZodValidationPipe(createCustomerSchema))
  async createCustomer(@Args('data') args: CreateCustomer) {
    return await this.customerService.createOne(args);
  }

  @Mutation(() => Customer)
  async deleteCustomer(@Args('data') args: WhereUniqueCustomer) {
    return await this.customerService.deleteOne(args);
  }
}
