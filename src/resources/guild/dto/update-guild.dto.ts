import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateGuildDto {
  @Field()
  id: number;
}
