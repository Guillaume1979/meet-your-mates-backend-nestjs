import { Injectable } from '@nestjs/common';
import { CreateSessionInput } from './dto/create-session.input';
import { UpdateSessionInput } from './dto/update-session.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';
import { Public } from '../../decorator/public-decorator';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  create(createSessionInput: CreateSessionInput) {
    return 'This action adds a new session';
  }

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

  findOne(id: number) {
    return `This action returns a #${id} session`;
  }

  update(id: number, updateSessionInput: UpdateSessionInput) {
    return `This action updates a #${id} session`;
  }

  remove(id: number) {
    return `This action removes a #${id} session`;
  }
}
