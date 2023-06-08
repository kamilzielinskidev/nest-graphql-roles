import { Module } from '@nestjs/common';
import { AuthModule } from './features/auth/auth.module';
import { CustomerModule } from './features/customer/customer.module';
import { ApolloGraphQLModule } from './ApolloGraphQLModule';

@Module({
  imports: [ApolloGraphQLModule, CustomerModule, AuthModule],
})
export class AppModule {}
