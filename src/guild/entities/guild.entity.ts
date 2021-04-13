import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntities } from '../../generic/timestamp-entities';
import { Player } from '../../player/entities/player.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Guild extends TimestampEntities {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field(() => [Player], { nullable: true })
  @ManyToMany(() => Player, (player) => player.guilds)
  members: Player[];
}
