import { Injectable } from '@nestjs/common';
import { Player } from './player/entities/player';
import { Guild } from './guild/entities/guild.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechnicalRole } from './technical-role/technical.role';

@Injectable()
export class DataLoadingService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    @InjectRepository(Guild)
    private readonly guildRepository: Repository<Guild>,
    @InjectRepository(TechnicalRole)
    private readonly technicalRepository: Repository<TechnicalRole>,
  ) {
    this.initDB();
  }

  private async initDB() {
    await this.loadTechnicalRoles();
    await this.loadGuilds();
    await this.loadPlayers();
  }

  private async loadPlayers(): Promise<void> {
    const _players: Partial<Player>[] = [
      {
        username: 'Guitou',
        email: 'guitou@mym.fr',
        age: 41,
        technicalRoles: [{ id: 1 }, { id: 2 }],
        guilds: [],
      } as Player,
      {
        username: 'Germain',
        email: 'germain@mym.fr',
        age: 37,
        technicalRoles: [{ id: 2 }],
      } as Player,
      {
        username: 'Pinou',
        email: 'pinou@mym.fr',
        age: 9,
        technicalRoles: [{ id: 2 }],
      } as Player,
      {
        username: 'Capucine',
        email: 'capucine@mym.fr',
        age: 11,
        technicalRoles: [{ id: 2 }],
      } as Player,
      {
        username: 'Raphy',
        email: 'raphy@mym.fr',
        age: 11,
        technicalRoles: [{ id: 2 }],
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

  private async loadTechnicalRoles(): Promise<void> {
    const roles: TechnicalRole[] = [
      { name: 'admin' } as TechnicalRole,
      { name: 'user' } as TechnicalRole,
    ];
    await this.technicalRepository.save(roles);
  }
}
