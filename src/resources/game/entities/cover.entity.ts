import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Cover {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;
}
