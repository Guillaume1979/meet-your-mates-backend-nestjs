import { Injectable } from '@nestjs/common';
import { Player } from './player/entities/player.entity';
import { Guild } from './guild/entities/guild.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DataLoadingService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    @InjectRepository(Guild)
    private readonly guildRepository: Repository<Guild>,
  ) {
    this.initDB().then((value) => console.log('Database loaded'));
  }

  private async initDB() {
    await this.loadGuilds();
    await this.loadPlayers();
  }

  private async loadPlayers(): Promise<void> {
    const _players: Partial<Player>[] = [
      {
        username: 'Guitou',
        email: 'guitou@mym.fr',
        discordId: '294251344401793024',
        age: 41,
        role: 'admin',
        guilds: [],
      } as Player,
      {
        username: 'Germain',
        email: 'germain@mym.fr',
        discordId: '12',
        age: 37,
        role: 'user',
      } as Player,
      {
        username: 'Pinou',
        email: 'pinou@mym.fr',
        discordId: '13',
        age: 9,
        role: 'user',
      } as Player,
      {
        username: 'Capucine',
        email: 'capucine@mym.fr',
        discordId: '14',
        age: 11,
        role: 'user',
      } as Player,
      {
        username: 'Raphy',
        email: 'raphy@mym.fr',
        discordId: '15',
        age: 11,
        role: 'user',
      } as Player,
    ];

    _players.forEach((player) => {
      player.guilds = [{ id: 1 } as Guild];
      if (player.username === 'Guitou' || player.username === 'Germain') {
        player.guilds.push({ id: 2 } as Guild);
      }
    });
    await this.playerRepository.save(_players);
  }

  private async loadGuilds(): Promise<void> {
    const _guilds: Guild[] = [
      { name: 'La Guilde de Toto' } as Guild,
      { name: "L'autre guilde" } as Guild,
    ];
    await this.guildRepository.save(_guilds);
  }
}
