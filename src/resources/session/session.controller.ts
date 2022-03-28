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

  @Get('/next-sessions/:numberOfSessions')
  getNextSessions(
    @Param('numberOfSessions', ParseIntPipe) numberOfSessions: Number,
    @User() user: Player,
  ): Promise<Session[]> {
    return this.sessionService.findNextSessions(+numberOfSessions, user);
  }
}
