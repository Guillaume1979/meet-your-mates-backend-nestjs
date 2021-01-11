import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { PlayerService } from './player.service';
import { PlayerEntity } from './entities/player.entity';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  getPlayers(): PlayerEntity[] {
    return this.playerService.getPlayers();
  }

  @Get(':id')
  getPlayerById(@Param('id', ParseIntPipe) id: number): PlayerEntity {
    return this.playerService.getPlayerById(id);
  }

  @Post()
  createPlayer(@Body() newPlayer: PlayerEntity): PlayerEntity {
    console.log(newPlayer);
    return this.playerService.createPlayer(newPlayer);
  }

  @Put(':id')
  updatePLayer(@Param('id', ParseIntPipe) id: number, @Body() player : PlayerEntity): PlayerEntity {
    return this.playerService.updatePlayer(id, player);
  }
}
