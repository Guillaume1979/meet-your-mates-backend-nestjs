import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SessionService } from './session.service';
import { Session } from './entities/session.entity';
import { User } from '../../decorator/user.decorator';
import { Player } from '../player/entities/player.entity';

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  getSessions(): Promise<Session[]> {
    return this.sessionService.findAll();
  }

  @Get('registredPlayers/:sessionId')
  getRegisteredPlayersBySession(
    @Param('sessionId', ParseIntPipe) sessionId: number,
  ): Promise<Player[]> {
    return this.sessionService.findPlayersBySession(+sessionId);
  }
}
