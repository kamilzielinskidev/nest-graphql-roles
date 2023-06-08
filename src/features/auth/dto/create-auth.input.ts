import { InputType, PickType } from '@nestjs/graphql';
import { z } from 'zod';
import { Customer } from '../../customer/models/customer.model';

export const createAuthSchema = z.object({ email: z.string().email(), password: z.string().min(12) });

@InputType()
export class CreateAuth extends PickType(Customer, ['email', 'password']) {}
