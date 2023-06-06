import { UsePipes } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { Customer } from 'src/features/customer/models/customer.model';
import { CustomerService } from './customer.service';
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
  async deleteCustomer(@Args('data') args: WhereUniqueCustomer) {
    return await this.customerService.deleteOne(args);
  }
}
