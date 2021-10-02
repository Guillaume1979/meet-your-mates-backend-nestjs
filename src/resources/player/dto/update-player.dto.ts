import { CreatePlayerDto } from './create-player.dto';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdatePlayerDto extends CreatePlayerDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsOptional()
  age: number;
}
