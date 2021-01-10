import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { PlayerService } from './player.service';
import { Player } from '../entities/player';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  getPlayers(): Player[] {
    return this.playerService.getPlayers();
  }

  @Get('/:id')
  getPlayerById(@Param('id', ParseIntPipe) id: number): Player {
    return this.playerService.getPlayerById(id);
  }

  @Post()
  createPlayer(@Body() newPlayer: Player): Player {
    console.log(newPlayer);
    return this.playerService.createPlayer(newPlayer);
  }
}
