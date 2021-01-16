import { Player } from '../player/entities/player';

export class PaginatedResultDto {
  limit: number;
  page: number;
  totalItems: number;
  totalPages: number;
  data: Player[];
}
