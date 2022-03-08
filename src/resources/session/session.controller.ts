import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SessionService } from './session.service';
import { Session } from './entities/session.entity';
import { Public } from '../../decorator/public-decorator';

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  getSessions(): Promise<Session[]> {
    return this.sessionService.findAll();
  }

  @Public()
  @Get('/next-sessions/:numberOfSessions')
  getNextSessions(
    @Param('numberOfSessions', ParseIntPipe) numberOfSessions: Number,
  ): Promise<Session[]> {
    return this.sessionService.findNextSessions(+numberOfSessions);
  }
}
