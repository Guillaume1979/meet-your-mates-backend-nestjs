import { Injectable } from '@nestjs/common';
import { Player } from './player/entities/player.entity';
import { Guild } from './guild/entities/guild.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role/role';

@Injectable()
export class DataLoadingService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    @InjectRepository(Guild)
    private readonly guildRepository: Repository<Guild>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {
    this.initDB();
  }

  private async initDB() {
    await this.loadRoles();
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
        roles: [{ id: 1 }, { id: 2 }],
        guilds: [],
      } as Player,
      {
        username: 'Germain',
        email: 'germain@mym.fr',
        age: 37,
        roles: [{ id: 2 }],
      } as Player,
      {
        username: 'Pinou',
        email: 'pinou@mym.fr',
        age: 9,
        roles: [{ id: 2 }],
      } as Player,
      {
        username: 'Capucine',
        email: 'capucine@mym.fr',
        age: 11,
        roles: [{ id: 2 }],
      } as Player,
      {
        username: 'Raphy',
        email: 'raphy@mym.fr',
        age: 11,
        roles: [{ id: 2 }],
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

  private async loadRoles(): Promise<void> {
    const roles: Role[] = [
      { name: 'admin' } as Role,
      { name: 'user' } as Role,
    ];
    await this.roleRepository.save(roles);
  }
}
