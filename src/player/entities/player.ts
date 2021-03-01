import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { TimestampEntities } from '../../generic/timestamp-entities';
import { PlayerRoleEnum } from '../../enums/player-role.enum';
import { Guild } from '../../guild/entities/guild.entity';
import { TechnicalRole } from '../../technical-role/technical.role';

@Entity()
export class Player extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  age: number;

  @ManyToMany(() => TechnicalRole, (technicalRole) => technicalRole.players, {
    eager: true,
    nullable: false,
    cascade: true,
  })
  @JoinTable()
  technicalRoles: TechnicalRole[];

  @ManyToMany((type) => Guild, (guild) => guild.players, {
    eager: true,
    nullable: true,
    // cascade: true,
  })
  @JoinTable()
  guilds: Guild[];
}
