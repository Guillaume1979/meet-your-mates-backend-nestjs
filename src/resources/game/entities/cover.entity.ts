import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cover {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;
}
