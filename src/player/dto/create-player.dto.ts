import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePlayerDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  discordId: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  avatar: string;

  // @Field()
  // @IsNotEmpty()
  // roles: Role[];
}
