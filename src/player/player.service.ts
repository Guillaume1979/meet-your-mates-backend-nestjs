import { Injectable, NotFoundException } from '@nestjs/common';
import { PlayerEntity } from './entities/player.entity';

@Injectable()
export class PlayerService {
  private players: PlayerEntity[] = [];

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

  createPlayer(player: PlayerEntity): PlayerEntity {
    player.createdAt = new Date();
    this.players.push(player);
    return player;
  }

  updatePlayer(id: number, player: PlayerEntity) {
    return undefined;
  }
}
