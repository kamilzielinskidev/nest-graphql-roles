import { Module } from '@nestjs/common';
import { BcryptModule } from 'lib/bcrypt/bcrypt.module';
import { JwtModule } from 'lib/jwt/jwt.module';
import { PrismaModule } from 'lib/prisma/prisma.module';
import { AuthService } from '../auth/auth.service';
import { EnvsModule } from '../envs/envs.module';
import { CustomerResolver } from './customer.resolver';
import { CustomerService } from './customer.service';

@Module({
  imports: [PrismaModule, BcryptModule, EnvsModule, JwtModule],
  providers: [CustomerService, CustomerResolver, AuthService],
})
export class CustomerModule {}
