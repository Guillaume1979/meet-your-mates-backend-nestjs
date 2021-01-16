import { IsString } from 'class-validator';

export class PaginationDto {
  @IsString()
  limit: number;

  @IsString()
  page: number;
}
