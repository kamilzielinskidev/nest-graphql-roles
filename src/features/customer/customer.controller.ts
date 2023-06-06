import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { CustomerService } from './customer.service';
import { CreateAuth, createAuthSchema } from './dto/create-auth.input';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(createAuthSchema))
  async register(@Body() body: CreateAuth) {
    return await this.customerService.createOne(body);
  }

  // TODO: implement
  // @Post('login')
  // @UsePipes(new ZodValidationPipe(createAuthSchema))
  // async login(@Body() body: CreateAuth) {
  //   return await this.customerService.createOne(body);
  // }
}
