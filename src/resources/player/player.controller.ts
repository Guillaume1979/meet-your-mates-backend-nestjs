import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
} from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from './entities/player.entity';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PaginationDto } from '../../generic/pagination.dto';
import { Roles } from '../../decorator/roles.decorator';
import { Role } from '../../enums/role';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../decorator/user.decorator';

@Controller('players')
export class PlayerController {
  constructor(
    private readonly playerService: PlayerService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  @Roles(Role.ADMIN)
  getPlayers(@Query() paginationDto: PaginationDto) {
    return this.playerService.getPlayers(paginationDto);
  }

  @Get('sessions')
  getSessions(@User() user: Player): Promise<Player> {
    return this.playerService.getPlayerSessions(user);
  }

  @Get(':id')
  getPlayerById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Partial<Player>> {
    return this.playerService.getPlayerById(id);
  }

  @Get('/dashboard/:numberOfSessions')
  getDashboardData(
    @User() user: Player,
    @Param('numberOfSessions', ParseIntPipe) numberOfSessions: number,
  ): Promise<Partial<Player>> {
    return this.playerService.getDashboardData(+numberOfSessions, user);
  }

  @Get('search/withdeleted')
  @Roles(Role.ADMIN)
  getPlayersWithDeleted(): Promise<Player[]> {
    return this.playerService.getPlayersWithDeleted();
  }

  @Put(':id')
  updatePLayer(
    @Param('id', ParseIntPipe) id: number,
    @Body() player: UpdatePlayerDto,
  ) {
    return this.playerService.updatePlayer(id, player);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  deletePlayer(@Param('id', ParseIntPipe) id: number) {
    this.playerService.deletePlayer(id);
  }

  // todo :  à revoir
  /*@Get('dev/token')
  @Roles(Role.ADMIN)
  getDevToken(): { mym_token: string } {
    const payload = {
      username: 'toto',
      id: 999,
      avatar: '',
      roles: ['admin'],
      discordId: '',
    };
    if (process.env.ENVIRONMENT === 'dev') {
      return {
        mym_token: this.jwtService.sign(payload),
      };
    }
    return {
      mym_token: 'Not possible in that environment',
    };
  }*/
}
