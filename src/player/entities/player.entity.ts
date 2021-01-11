import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlayerEntity {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  id: number;

  @Column()
  @IsNotEmpty()
  username: string;

  @Column()
  @IsOptional()
  @IsInt()
  age: number;

  @Column()
  @IsOptional()
  createdAt?: Date;
}
