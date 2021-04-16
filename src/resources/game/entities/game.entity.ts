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

  @Column()
  name: string;

  // category = "main game", "dlc", "remaster"...
  @Column()
  category: string;

  @OneToOne(() => Cover)
  @JoinColumn()
  cover: Cover;
}
