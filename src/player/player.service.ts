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
import { Guild } from '../guild/entities/guild.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {
    this.initBdd();
  }

  private async initBdd(): Promise<void> {
    const _players: Player[] = [
      {
        username: 'Guitou',
        email: 'guitou@mym.fr',
        age: 41,
        password: 'toto',
        role: 'admin',
        guilds: [],
      } as Player,
      // {
      //   username: 'Germain',
      //   email: 'germain@mym.fr',
      //   age: 37,
      //   password: 'toto',
      //   role: 'user',
      // },
      // {
      //   username: 'Pinou',
      //   email: 'pinou@mym.fr',
      //   age: 9,
      //   password: 'toto',
      //   role: 'user',
      // },
      // {
      //   username: 'Capucine',
      //   email: 'capucine@mym.fr',
      //   age: 11,
      //   password: 'toto',
      //   role: 'user',
      // },
      // {
      //   username: 'Raphy',
      //   email: 'raphy@mym.fr',
      //   age: 11,
      //   password: 'toto',
      //   role: 'user',
      // },
    ];

    _players.forEach((player) => {
      player.guilds = [
        { name: 'La Guilde de Toto' } as Guild,
        { name: "L'autre guilde" } as Guild,
      ];
      // player.guilds.push({ name: 'test' } as Guild);
    });
    const load = await this.playerRepository.save(_players);
  }

  private async findPlayerById(playerId: number): Promise<Player> {
    const player = await this.playerRepository.findOne(playerId);
    if (!player) {
      throw new NotFoundException('Player not found');
    }
    return player;
  }

  async getPlayers(paginationDto: PaginationDto): Promise<PaginatedResultDto> {
    const skippedItems = paginationDto.limit * (paginationDto.page - 1);
    const totalPlayers = await this.playerRepository.count();
    const totalPages = Math.ceil(totalPlayers / paginationDto.limit);
    const players = await this.playerRepository
      .createQueryBuilder()
      .select()
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

  async getPlayerById(id: number): Promise<Player> {
    // const playerToGet = await this.playerRepository.findOne(id);
    // if (!!playerToGet) {
    //   return playerToGet;
    // } else {
    //   throw new NotFoundException();
    // }
    return this.findPlayerById(id);
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
      return this.playerRepository.findOne(id);
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

  // async register(userData: UserRegistrationDto): Promise<Player> {
  //   const user = this.playerRepository.create({
  //     ...userData
  //   });
  // }
}
