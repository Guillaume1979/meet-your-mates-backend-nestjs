import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntities } from '../../../generic/timestamp-entities';
import { Player } from '../../player/entities/player.entity';

@Entity()
export class Guild extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  discordId: string;

  @ManyToMany(() => Player, (player) => player.guilds)
  members: Player[];
}
