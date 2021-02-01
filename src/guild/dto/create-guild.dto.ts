import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGuildDto {
  @IsNotEmpty()
  name: string;
}
