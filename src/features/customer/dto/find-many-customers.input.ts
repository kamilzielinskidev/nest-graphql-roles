import { InputType, PartialType } from '@nestjs/graphql';
import { Customer } from '../models/customer.model';

@InputType()
class WhereCustomer extends PartialType(Customer) {}

@InputType()
export class FindManyCustomers {
  cursor?: WhereCustomer;
  skip?: number;
  take?: number;
  where: WhereCustomer;
}
