import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntities } from '../../generic/timestamp-entities';

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
}
