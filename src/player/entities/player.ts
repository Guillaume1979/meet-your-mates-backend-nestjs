import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { TimestampEntities } from '../../generic/timestamp-entities';
import { PlayerRoleEnum } from '../../enums/player-role.enum';
import { Guild } from '../../guild/entities/guild.entity';

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

  @Column({ nullable: true }) // nullable à revoir quand utilisation oauth2
  password: string;

  @Column({ nullable: true }) // nullable à revoir quand utilisation oauth2
  salt: string;

  @Column({
    type: 'enum',
    enum: PlayerRoleEnum,
    default: PlayerRoleEnum.USER,
    nullable: true,
  })
  role: string;

  @ManyToMany((type) => Guild, (guild) => guild.players, {
    eager: true,
    nullable: true,
    cascade: true,
  })
  @JoinTable()
  guilds: Guild[];
}
