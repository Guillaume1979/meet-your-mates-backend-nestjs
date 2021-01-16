import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Player } from './entities/player';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PaginationDto } from '../generic/pagination.dto';
import { PaginatedResultDto } from '../generic/paginated-result.dto';

@Injectable()
export class PlayerService {
  private players: Player[] = [];

  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {
    const _players: CreatePlayerDto[] = [
      {
        username: 'Guitou',
        email: 'guitou@mym.fr',
        age: 41,
      },
      {
        username: 'Germain',
        email: 'germain@mym.fr',
        age: 37,
      },
    ];
    this.playerRepository.clear();
    this.playerRepository.save(_players);
  }

  async getPlayers(paginationDto: PaginationDto): Promise<PaginatedResultDto> {
    const skippedItems = paginationDto.limit * (paginationDto.page - 1);
    const totalPlayers = await this.playerRepository.count();
    const totalPages = Math.ceil(totalPlayers / paginationDto.limit);
    const players = await this.playerRepository
      .createQueryBuilder()
      .select()
      .skip(skippedItems)
      .limit(paginationDto.limit)
      .getMany();
    return {
      limit: paginationDto.limit,
      page: paginationDto.page,
      totalPages: totalPages,
      totalItems: totalPlayers,
      data: players,
    };
  }

  getPlayerById(id: number): Promise<Player> {
    const playerToGet = this.playerRepository.findOne(id);
    if (!!playerToGet) {
      return playerToGet;
    } else {
      throw new NotFoundException();
    }
  }

  getPlayersWithDeleted(): Promise<Player[]> {
    return this.playerRepository.find({ withDeleted: true });
  }

  createPlayer(player: CreatePlayerDto): Promise<Player> {
    return this.playerRepository.save(player);
  }

  async updatePlayer(id: number, player: UpdatePlayerDto): Promise<Player> {
    if (id !== player.id) {
      throw new BadRequestException('Player id is different from URI id');
    }
    const playerToUpdate = await this.playerRepository.findOne(id);
    if (!!playerToUpdate) {
      await this.playerRepository.save(player);
      return this.playerRepository.findOne(player.id);
    } else {
      throw new NotFoundException('player to update not found');
    }
  }

  async deletePlayer(id: number) {
    const playerToDelete = await this.playerRepository.findOne(id);
    if (!!playerToDelete) {
      await this.playerRepository.softDelete(id);
    } else {
      throw new NotFoundException('Player to delete not found');
    }
  }
}
