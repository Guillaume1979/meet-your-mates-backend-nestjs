import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '../resources/player/entities/player.entity';
import { Repository } from 'typeorm';
import { UserDetails } from './utils/auth-interfaces';
import { JwtService } from '@nestjs/jwt';
import { PlayerRoleEnum } from '../enums/player-role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(user: UserDetails): Promise<Player> {
    const { discordId } = user;
    let player: Player;
    const playerToCheck: Player = await this.playerRepository.findOne({
      discordId,
    });
    if (playerToCheck) {
      //todo vérifier que la mise à jour se fait bien seulement sur les champs modifiés et pas sur les champs non présents dans les infos Discord (sessions...)
      await this.playerRepository.update({ discordId }, user);
      player = await this.playerRepository.findOne({ discordId });
    } else {
      player = await this.createUser(user);
    }
    return player;
  }

  async createUser(user: UserDetails): Promise<Player> {
    const { username, email, discordId, avatar } = user;
    const playerToCreate: Partial<Player> = {
      username,
      email,
      discordId,
      avatar,
      role: PlayerRoleEnum.USER,
    } as Player;

    //TODO A tester cette façon de faire. Voir comment gérer la création du rôle de cette façon
    // const toto: CreatePlayerDto = await this.playerRepository.create(user);
    return await this.playerRepository.save(playerToCreate);
  }

  async login(user: Player): Promise<{ access_token }> {
    const payload = {
      username: user.username,
      userId: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
