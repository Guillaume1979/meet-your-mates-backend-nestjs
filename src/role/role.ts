import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Player } from '../player/entities/player.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Role {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field(() => [Player], { nullable: true })
  @ManyToMany(() => Player, (player) => player.roles)
  players: Player[];
}
