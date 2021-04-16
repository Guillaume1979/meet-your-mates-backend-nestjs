import { Player } from '../resources/player/entities/player.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginatedResultDto {
  @Field(() => Int)
  limit: number;
  @Field(() => Int)
  page: number;
  @Field(() => Int)
  totalItems: number;
  @Field(() => Int)
  totalPages: number;
  @Field(() => [Player])
  data: Player[];
}
