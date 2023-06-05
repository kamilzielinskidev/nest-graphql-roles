import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class Base {
  @Field(() => ID)
  id: string;

  createdAt: Date;
  updatedAt: Date;
}
