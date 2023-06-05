import { InputType, PickType } from '@nestjs/graphql';
import { Customer } from '../models/customer.model';

@InputType()
export class CustomerCreateInput extends PickType(Customer, ['email', 'password']) {}

@InputType()
export class CustomerCreate {
  data: CustomerCreateInput;
}
