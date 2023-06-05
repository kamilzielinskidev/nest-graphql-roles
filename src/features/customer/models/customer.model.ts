import { InputType, ObjectType } from '@nestjs/graphql';
import { Base } from 'lib/entities/base.entity';

@InputType('InputCustomer')
@ObjectType('ObjectCustomer')
export class Customer extends Base {
  email: string;
  password: string;
}
