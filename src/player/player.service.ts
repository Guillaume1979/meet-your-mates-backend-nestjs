import { Injectable, NotFoundException } from '@nestjs/common';
import { PlayerEntity } from './entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlayerService {
  private players: PlayerEntity[] = [];

  constructor(
    @InjectRepository(PlayerEntity)
    private readonly playerRepository: Repository<PlayerEntity>,
  ) {
    const firstPlayer: PlayerEntity = {
      id: 1,
      username: 'Guitou',
      age: 41,
    };
    this.createPlayer(firstPlayer);
    this.createPlayer({
      id: 2,
      username: 'Germain',
      age: 37,
    });
  }

  getPlayers(): PlayerEntity[] {
    return this.players;
  }

  getPlayerById(id: number): PlayerEntity {
    const playerToGet = this.players.find((player) => player.id === id);
    if (!!playerToGet) {
      return playerToGet;
    } else {
      throw new NotFoundException();
    }
  }

  createPlayer(player: PlayerEntity): Promise<PlayerEntity> {
    player.createdAt = new Date();
    return this.playerRepository.save(player);
  }

  updatePlayer(id: number, player: PlayerEntity) {
    return 'toto';
  }
}
