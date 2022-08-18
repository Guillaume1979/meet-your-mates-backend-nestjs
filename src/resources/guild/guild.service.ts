import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guild } from './entities/guild.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GuildService {
  constructor(
    @InjectRepository(Guild)
    private readonly guildRepository: Repository<Guild>,
  ) {}

  async findAll(): Promise<Guild[]> {
    return await this.guildRepository.find({ relations: { members: true } });
  }

  async findOne(id: number) {
    return await this.guildRepository.findOne({
      where: { id },
      relations: { members: true },
    });
  }
}
