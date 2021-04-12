import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TimestampEntities {
  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updateAt: Date;

  @Field()
  @DeleteDateColumn()
  deletedAt: Date;
}
