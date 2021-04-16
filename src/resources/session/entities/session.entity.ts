import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Session {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;
}
