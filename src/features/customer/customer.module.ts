import { Module } from '@nestjs/common';
import { PrismaModule } from 'lib/prisma/prisma.module';
import { CustomerResolver } from './customer.resolver';
import { CustomerService } from './customer.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [CustomerService, CustomerResolver],
})
export class CustomerModule {}
