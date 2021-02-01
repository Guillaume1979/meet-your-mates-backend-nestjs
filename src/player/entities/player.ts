import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntities } from '../../generic/timestamp-entities';
import { PlayerRoleEnum } from '../../enums/player-role.enum';

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
}
