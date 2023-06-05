import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { Customer } from '../models/customer.model';

@InputType()
class CustomerWhereUniqueInput extends PartialType(PickType(Customer, ['id', 'email'])) {}

@InputType()
export class CustomerFindUnique {
  where: CustomerWhereUniqueInput;
}
