import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { TimestampEntities } from '../../generic/timestamp-entities';
import { Guild } from '../../guild/entities/guild.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PlayerRoleEnum } from '../../enums/player-role.enum';

@ObjectType({ description: 'Information about the players' })
@Entity()
export class Player extends TimestampEntities {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  username: string;

  @Field()
  @Column({ nullable: false })
  email: string;

  @Field({
    nullable: false,
    description: 'unique identifier of Discord account',
  })
  @Column({ unique: true, nullable: false })
  discordId: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  age: number;

  @Field({ nullable: false })
  @Column({
    type: 'enum',
    enum: PlayerRoleEnum,
    default: PlayerRoleEnum.USER,
    nullable: false,
  })
  role: string;

  @Field(() => [Guild], { nullable: true })
  @ManyToMany(() => Guild, (guild) => guild.members, {
    eager: true,
    nullable: true,
  })
  @JoinTable()
  guilds: Guild[];
}
