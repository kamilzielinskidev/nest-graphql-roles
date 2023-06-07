import { D, O, pipe } from '@mobily/ts-belt';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { join } from 'path';
import { CustomerModule } from './features/customer/customer.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // these options are passed to apollo server, check their docs for more info
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
      playground: true,
      introspection: true, // TODO update this so that it's off in production;
      formatError: (error: GraphQLError) => {
        const { extensions, message } = error;

        const code = pipe(extensions, D.get('code'), O.getWithDefault('INTERNAL_SERVER_ERROR'));

        const graphQLFormattedError = {
          code,
          message,
        };
        return graphQLFormattedError;
      },
    }),
    CustomerModule,
  ],
})
export class AppModule {}
