import { Injectable, NotFoundException } from '@nestjs/common';
import { Player } from '../entities/player';

@Injectable()
export class PlayerService {
  private players: Player[] = [];

  getPlayers(): Player[] {
    return this.players;
  }

  getPlayerById(id: number): Player {
    const playerToGet = this.players.find((player) => player.id === id);
    if (!!playerToGet) {
      return playerToGet;
    } else {
      throw new NotFoundException();
    }
  }

  createPlayer(player: Player): Player {
    player.createdAt = new Date();
    this.players.push(player);
    return player;
  }
}
