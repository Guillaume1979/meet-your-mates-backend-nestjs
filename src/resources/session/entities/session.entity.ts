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

  @ManyToOne(() => Game)
  game?: Game;

  @Column()
  date: string;

  @ManyToMany(() => Player, (player) => player.sessions)
  registeredPlayers: Player[];
}
