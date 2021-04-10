import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Player } from './entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PaginationDto } from '../generic/pagination.dto';
import { PaginatedResultDto } from '../generic/paginated-result.dto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  private async findPlayerById(playerId: number): Promise<Partial<Player>> {
    const player = await this.playerRepository.findOne(playerId);
    if (!player) {
      throw new NotFoundException('Player not found');
    }
    const { discordId, ...playerWithoutDiscordId } = player;
    return playerWithoutDiscordId;
  }

  async getPlayers(paginationDto: PaginationDto): Promise<PaginatedResultDto> {
    const skippedItems = paginationDto.limit * (paginationDto.page - 1);
    const totalPlayers = await this.playerRepository.count();
    const totalPages = Math.ceil(totalPlayers / paginationDto.limit);
    const players = await this.playerRepository
      .createQueryBuilder('player')
      // add relation with technical role to obtain the role of the player
      .leftJoinAndSelect('player.technicalRoles', 'technicalRoles')
      // add relation to get the player's guilds
      .leftJoinAndSelect('player.guilds', 'guilds')
      .skip(skippedItems)
      .take(paginationDto.limit)
      .getMany();
    return {
      limit: paginationDto.limit,
      page: paginationDto.page,
      totalPages: totalPages,
      totalItems: totalPlayers,
      data: players,
    };
  }

  async getPlayerById(id: number): Promise<Partial<Player>> {
    return this.findPlayerById(id);
  }

  getPlayersWithDeleted(): Promise<Player[]> {
    return this.playerRepository.find({ withDeleted: true });
  }

  async updatePlayer(
    id: number,
    player: UpdatePlayerDto,
  ): Promise<Partial<Player>> {
    if (id !== player.id) {
      throw new BadRequestException('Player id is different from URI id');
    }
    const playerToUpdate = await this.playerRepository.findOne(id);
    if (playerToUpdate !== undefined) {
      await this.playerRepository.save(player);
      const playerUpdated = await this.playerRepository.findOne(id);
      const { discordId, ...playerUpdatedWithoutDiscordId } = playerUpdated;
      return playerUpdatedWithoutDiscordId;
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
