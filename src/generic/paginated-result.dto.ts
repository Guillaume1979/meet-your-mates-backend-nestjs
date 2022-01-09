import { Player } from '../resources/player/entities/player.entity';

export class PaginatedResultDto {
  limit: number;
  page: number;
  totalItems: number;
  totalPages: number;
  data: Player[];
}
