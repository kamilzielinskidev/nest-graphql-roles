import { Module } from '@nestjs/common';
import { BcryptModule } from 'lib/bcrypt/bcrypt.module';
import { JwtModule } from 'lib/jwt/jwt.module';
import { PrismaModule } from 'lib/prisma/prisma.module';
import { AuthService } from './auth.service';
import { CustomerController } from './customer.controller';
import { CustomerResolver } from './customer.resolver';
import { CustomerService } from './customer.service';

@Module({
  imports: [PrismaModule, BcryptModule, JwtModule],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerResolver, AuthService],
})
export class CustomerModule {}
