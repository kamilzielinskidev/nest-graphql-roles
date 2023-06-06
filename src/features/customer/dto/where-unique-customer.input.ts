import { G } from '@mobily/ts-belt';
import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { z } from 'zod';
import { Customer } from '../models/customer.model';

export const whereUniqueSchemaCustomer = z
  .object({ id: z.string().optional(), email: z.string().email().optional() })
  .refine(({ id, email }) => {
    G.isNullable(id) && G.isNullable(email);
    return false;
  }, 'Either id or email is required.');

@InputType()
export class WhereUniqueCustomer extends PartialType(PickType(Customer, ['id', 'email'])) {}
