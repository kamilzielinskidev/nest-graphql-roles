import { UseGuards, UsePipes } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Header } from 'common/decorators/header.decorator';
import { AuthorizationGuard } from 'common/guards/authorization.guard';
import { ZodValidationPipe } from 'common/pipes/zod-validation.pipe';
import { Customer } from 'features/customer/models/customer.model';
import { parseAuthorizationHeader } from 'lib/jwt/helpers';
import { CustomerService } from './customer.service';
import { FindManyCustomers } from './dto/find-many-customers.input';
import { WhereUniqueCustomer, whereUniqueSchemaCustomer } from './dto/where-unique-customer.input';
import { Role } from './models/role';

@Resolver()
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard([Role.ADMIN, Role.USER]))
  async me(@Header('authorization') authorizationHeader: string) {
    const token = parseAuthorizationHeader(authorizationHeader);

    return await this.customerService.findMe(token);
  }

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard([Role.ADMIN]))
  @UsePipes(new ZodValidationPipe(whereUniqueSchemaCustomer))
  async customer(
    @Args('data')
    args: WhereUniqueCustomer,
  ) {
    return await this.customerService.findOne(args);
  }

  @Query(() => [Customer])
  @UseGuards(AuthorizationGuard([Role.ADMIN]))
  async customers(@Args('data') args: FindManyCustomers) {
    return await this.customerService.findAll(args);
  }

  @Mutation(() => Customer)
  @UseGuards(AuthorizationGuard([Role.ADMIN]))
  async deleteCustomer(@Args('data') args: WhereUniqueCustomer) {
    return await this.customerService.deleteOne(args);
  }
}
