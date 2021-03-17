import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { TimestampEntities } from '../../generic/timestamp-entities';
import { Guild } from '../../guild/entities/guild.entity';
import { Role } from '../../role/role';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { type } from 'os';

@ObjectType()
@Entity()
export class Player extends TimestampEntities {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  username: string;

  @Field()
  @Column({ nullable: false })
  email: string;

  // TODO : revoir le nullable
  @Field({ nullable: true })
  @Column({ unique: true, nullable: true })
  discordId: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  age: number;

  @Field((type) => [Role])
  @ManyToMany(() => Role, (role) => role.players, {
    eager: true,
    nullable: false,
  })
  @JoinTable()
  roles: Role[];

  @Field((type) => [Guild])
  @ManyToMany(() => Guild, (guild) => guild.players, {
    eager: true,
    nullable: true,
  })
  @JoinTable()
  guilds: Guild[];
}
