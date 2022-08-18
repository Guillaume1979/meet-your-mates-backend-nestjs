import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Player } from './entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PaginationDto } from '../../generic/pagination.dto';
import { PaginatedResultDto } from '../../generic/paginated-result.dto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  private async findPlayerById(playerId: number): Promise<Partial<Player>> {
    const player = await this.playerRepository.findOne({
      where: { id: playerId },
      relations: {
        sessions: { registeredPlayers: true },
        guilds: { members: true },
      },
    });
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
      .leftJoinAndSelect('player.guilds', 'guilds')
      .leftJoinAndSelect('player.sessions', 'sessions')
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

  async getDashboardData(
    numberOfSessions: number,
    user: Player,
  ): Promise<Partial<Player>> {
    const player = await this.playerRepository
      .createQueryBuilder('player')
      .leftJoinAndSelect('player.sessions', 'sessions')
      .leftJoinAndSelect('sessions.registeredPlayers', 'registeredPlayers')
      .leftJoinAndSelect('sessions.game', 'game')
      .leftJoinAndSelect('player.guilds', 'guilds')
      .leftJoinAndSelect('guilds.members', 'members')
      .where('player.id = :id', { id: user.id })
      .orderBy('sessions.date', 'DESC')
      .getOne();
    // take only the number of sessions asked
    player.sessions = player.sessions.splice(0, numberOfSessions);
    // sort the guilds by number of members in DESC order
    player.guilds.sort((guild1, guild2) => {
      return guild2.members.length - guild1.members.length;
    });
    const { discordId, ...playerWithOutDiscord } = player;
    return playerWithOutDiscord;
  }

  async getPlayersWithDeleted(): Promise<Player[]> {
    return await this.playerRepository.find({ withDeleted: true });
  }

  async updatePlayer(
    id: number,
    player: UpdatePlayerDto,
  ): Promise<Partial<Player>> {
    if (id !== player.id) {
      throw new BadRequestException('Player id is different from URI id');
    }
    const playerToUpdate = await this.playerRepository.findOneBy({ id });
    if (playerToUpdate !== undefined) {
      await this.playerRepository.save(player);
      const playerUpdated = await this.playerRepository.findOneBy({ id });
      const { discordId, ...playerUpdatedWithoutDiscordId } = playerUpdated;
      return playerUpdatedWithoutDiscordId;
    } else {
      throw new NotFoundException('player to update not found');
    }
  }

  async deletePlayer(id: number): Promise<Player> {
    const playerToDelete = await this.playerRepository.findOneBy({ id });
    if (playerToDelete !== undefined) {
      await this.playerRepository.softDelete(id);
      console.log(
        'joueur effacé : ',
        await this.playerRepository.findOne({
          where: { id },
          withDeleted: true,
        }),
      );
      return await this.playerRepository.findOne({
        where: { id },
        withDeleted: true,
      });
    } else {
      throw new NotFoundException('Player to delete not found');
    }
  }

  async getPlayerSessions(user: Player): Promise<Player> {
    const res = await this.playerRepository.findOne({
      where: {
        id: user.id,
      },
      relations: {
        sessions: {
          registeredPlayers: true,
        },
      },
    });
    console.log(res);
    return res;
  }
}
