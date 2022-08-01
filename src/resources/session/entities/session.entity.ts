import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Game } from '../../game/entities/game.entity';
import { Player } from '../../player/entities/player.entity';
import { TimestampEntities } from '../../../generic/timestamp-entities';

@Entity()
export class Session extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Game, { cascade: true, eager: true }) //todo revoir la cascade quand le chargement des jeux viendra de IGDB
  game: Game;

  @Column()
  date: string;

  // minimum number of players
  @Column({ default: 0 })
  minPlayers: number;

  // maximum number of players
  @Column({ default: 0 })
  maxPlayers: number;

  @ManyToMany(() => Player, (player) => player.sessions)
  registeredPlayers: Player[];

  // list of players beyond the maximum number of players waiting for a place
  @ManyToMany(() => Player, (player) => player.sessions)
  queueingPlayers: Player[];
}
