import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntities } from '../../generic/timestamp-entities';
import { Player } from '../../player/entities/player.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Guild extends TimestampEntities {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: true })
  name: string;

  @Field(() => [Player])
  @ManyToMany(() => Player, (player) => player.guilds)
  players: Player[];
}
