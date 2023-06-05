import { InputType, PartialType } from '@nestjs/graphql';
import { Customer } from '../models/customer.model';

@InputType()
class CustomerWhereInput extends PartialType(Customer) {}

@InputType()
export class CustomersFindMany {
  cursor?: CustomerWhereInput;
  skip?: number;
  take?: number;
  where: CustomerWhereInput;
}
