import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cover } from './cover.entity';
import { JoinColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Game {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: false })
  @Column()
  name: string;

  // category = "main game", "dlc", "remaster"...
  @Field({ nullable: true })
  @Column()
  category: string;

  @Field(() => Cover, { nullable: true })
  @OneToOne(() => Cover)
  @JoinColumn()
  cover: Cover;
}
