import {
  Body,
  Controller,
  Delete,
  Get, Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put
} from "@nestjs/common";
import { PlayerService } from './player.service';
import { Player } from './entities/player';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { ExceptionHandler } from '@nestjs/core/errors/exception-handler';
import { tryCatch } from 'rxjs/internal-compatibility';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  getPlayers(): Promise<Player[]> {
    return this.playerService.getPlayers();
  }

  @Get(':id')
  getPlayerById(@Param('id', ParseIntPipe) id: number): Promise<Player> {
    return this.playerService.getPlayerById(id);
  }

  @Get('search/withdeleted')
  getPlayersWithDeleted(): Promise<Player[]> {
    return this.playerService.getPlayersWithDeleted();
  }

  @Post()
  createPlayer(@Body() newPlayer: CreatePlayerDto): Promise<Player> {
    Logger.log(newPlayer);
    return this.playerService.createPlayer(newPlayer);
  }

  @Put(':id')
  updatePLayer(
    @Param('id', ParseIntPipe) id: number,
    @Body() player: UpdatePlayerDto,
  ) {
    return this.playerService.updatePlayer(id, player);
  }

  @Delete(':id')
  deletePlayer(@Param('id', ParseIntPipe) id: number) {
    this.playerService.deletePlayer(id);
  }
}
