import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Game } from '../../game/entities/game.entity';
import { Player } from '../../player/entities/player.entity';
import { TimestampEntities } from '../../../generic/timestamp-entities';

@ObjectType()
@Entity()
export class Session extends TimestampEntities {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Game, { nullable: true })
  @ManyToOne(() => Game)
  game: Game;

  @Field({ nullable: true })
  @Column()
  date: string;

  @Field(() => [Player], { nullable: true })
  @ManyToMany(() => Player, (player) => player.sessions)
  registeredPlayers: Player[];
}
