import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class Player {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  username: string;

  @IsOptional()
  @IsInt()
  age: number;

  createdAt: Date;
}
