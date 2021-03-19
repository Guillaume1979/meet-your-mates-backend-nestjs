import { CreatePlayerDto } from './create-player.dto';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  age: number;
}
