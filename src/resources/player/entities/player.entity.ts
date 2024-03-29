import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { TimestampEntities } from '../../../generic/timestamp-entities';
import { Guild } from '../../guild/entities/guild.entity';
import { Role } from '../../../enums/role';
import { Session } from '../../session/entities/session.entity';

@Entity()
export class Player extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  email: string;

  @Column({ unique: true, nullable: false })
  discordId: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  age: number;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
    nullable: false,
  })
  roles: Role[];

  @ManyToMany(() => Guild, (guild) => guild.members, {
    /*  eager: true,*/
    nullable: true,
  })
  @JoinTable()
  guilds: Guild[];

  @ManyToMany(() => Session, (session) => session.registeredPlayers, {
    nullable: true,
  })
  @JoinTable()
  sessions: Session[];
}
