import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '../resources/player/entities/player.entity';
import { Repository } from 'typeorm';
import { DiscordToken } from './utils/auth-interfaces';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../enums/role';
import { DiscordUser } from './utils/discord-user';
import { Guild } from '../resources/guild/entities/guild.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    @InjectRepository(Guild)
    private readonly guildRepository: Repository<Guild>,
  ) {}

  async login(token: DiscordToken): Promise<{ mym_token: string }> {
    const userInfoFromDiscord = await this.getUserInfoFromDiscord(token);
    const player = await this.validateUser(userInfoFromDiscord);
    await this.updateGuilds(token, player);

    return this.generateJwtToken(player);
  }

  async validateUser(user: DiscordUser): Promise<Player> {
    const { discordId } = user;
    let player: Player;
    const playerToCheck: Player = await this.playerRepository.findOne({
      discordId,
    });
    if (playerToCheck) {
      //todo : vérifier que la mise à jour se fait bien seulement sur les champs modifiés et pas sur les champs non présents dans les infos Discord (sessions...)
      await this.playerRepository.update({ discordId }, user);
      player = await this.playerRepository.findOne({ discordId });
    } else {
      player = await this.createUser(user);
    }
    return player;
  }

  async createUser(user: DiscordUser): Promise<Player> {
    const { username, email, discordId, avatar } = user;
    const playerToCreate: Partial<Player> = {
      username,
      email,
      discordId,
      avatar,
      roles: [Role.USER],
    } as Player;
    return await this.playerRepository.save(playerToCreate);
  }

  generateJwtToken(player: Player): { mym_token: string } {
    const payload = {
      username: player.username,
      id: player.id,
      avatar: player.avatar,
      roles: player.roles,
      discordId: player.discordId,
    };
    return {
      mym_token: this.jwtService.sign(payload),
    };
  }

  async getUserInfoFromDiscord(token: DiscordToken): Promise<DiscordUser> {
    try {
      const discordResponse$ = await this.httpService.get(
        'https://discord.com/api/v8/users/@me',
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        },
      );
      return firstValueFrom(discordResponse$).then((discordResponse) => {
        let data = discordResponse.data;
        return new DiscordUser(data.username, data.id, data.email, data.avatar);
      });
    } catch (err) {
      throw new HttpException('Unknown discord user', HttpStatus.UNAUTHORIZED);
    }
  }

  async updateGuilds(token: DiscordToken, player: Player): Promise<void> {
    await firstValueFrom(
      this.httpService.get('https://discord.com/api/v8/users/@me/guilds', {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      }),
    )
      .then(async (discordResponse) => {
        let guilds = discordResponse.data;
        player.guilds = [];
        for await (const guild of guilds) {
          const guildChecked = await this.guildRepository.findOne({
            discordId: guild.id,
          });
          // update existing guilds
          if (guildChecked !== undefined) {
            guildChecked.discordId = guild.id;
            guildChecked.name = guild.name;
            guildChecked.icon = guild.icon;
            const guildInBase = await this.guildRepository.save(guildChecked);
            player.guilds.push(guildInBase);
          } else {
            // create new guilds
            let guildToAdd = new Guild();
            guildToAdd.name = guild.name;
            guildToAdd.discordId = guild.id;
            guildToAdd.icon = guild.icon;
            const guildInBase = await this.guildRepository.save(guildToAdd);
            player.guilds.push(guildInBase);
          }
        }
        await this.addGuildToThePlayer(player);
      })
      .catch(
        () =>
          new HttpException(
            'Update guilds from Discord failed',
            HttpStatus.GATEWAY_TIMEOUT,
          ),
      );
  }

  async addGuildToThePlayer(player: Player): Promise<void> {
    await this.playerRepository.save(player);
  }
}
