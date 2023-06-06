import { InputType, PickType } from '@nestjs/graphql';
import { z } from 'zod';
import { Customer } from '../models/customer.model';

export const createCustomerSchema = z.object({ email: z.string().email(), password: z.string().min(12) });

@InputType()
export class CreateCustomer extends PickType(Customer, ['email', 'password']) {}
