import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSessionInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
