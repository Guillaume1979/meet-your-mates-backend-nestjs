import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Player } from '../player/entities/player';

@Entity()
export class TechnicalRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToMany(() => Player, (player) => player.technicalRoles)
  players: Player[];
}
