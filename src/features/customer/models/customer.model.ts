import { InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Base } from 'common/models/base.entity';
import { Role } from '../role';

registerEnumType(Role, {
  name: 'Role',
});

@InputType('InputCustomer')
@ObjectType('ObjectCustomer')
export class Customer extends Base {
  email: string;
  password: string;
  role: Role;
}
