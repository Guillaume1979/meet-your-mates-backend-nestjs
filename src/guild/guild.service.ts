import { Injectable } from '@nestjs/common';
import { CreateGuildDto } from './dto/create-guild.dto';
import { UpdateGuildDto } from './dto/update-guild.dto';
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
    return await this.guildRepository.find({ relations: ['members'] });
  }

  // async findAll(): Promise<Guild[]> {
  //   return await this.guildRepository
  //     .createQueryBuilder('guild')
  //     .leftJoinAndSelect('guild.members', 'members')
  //     .getMany();
  // }

  async findOne(id: number) {
    return await this.guildRepository.findOne(id, { relations: ['members'] });
  }
}
