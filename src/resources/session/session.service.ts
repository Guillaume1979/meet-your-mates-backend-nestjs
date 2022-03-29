import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';
import { Player } from '../player/entities/player.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async findAll(): Promise<Session[]> {
    return await this.sessionRepository.find({
      relations: ['registeredPlayers', 'game'],
      order: { date: 'DESC' },
    });
  }

  async findPlayersBySession(sessionId: number): Promise<Player[]> {
    const { registeredPlayers, ...rest } = await this.sessionRepository
      .createQueryBuilder('session')
      .where('session.id = :id', { id: sessionId })
      .leftJoinAndSelect('sessions.registeredPlayers', 'players')
      .getOne();
    return registeredPlayers;
  }
}
