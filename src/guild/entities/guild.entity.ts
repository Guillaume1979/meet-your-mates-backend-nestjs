import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntities } from '../../generic/timestamp-entities';
import { Player } from '../../player/entities/player';

@Entity()
export class Guild extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @ManyToMany((type) => Player, (player) => player.guilds)
  players: Player[];
}
