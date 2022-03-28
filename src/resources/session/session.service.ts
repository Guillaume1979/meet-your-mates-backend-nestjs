import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';

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

  async findNextSessions(number, player): Promise<Session[]> {
    return await this.sessionRepository
      .createQueryBuilder('sessions')
      .leftJoin('sessions.registeredPlayers', 'players')
      .leftJoinAndSelect('sessions.game', 'game')
      .where('players.id = :id', { id: player.id })
      .take(number)
      .orderBy({ 'sessions.date': 'DESC' })
      .getMany();
  }
}
