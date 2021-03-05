import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '../player/entities/player.entity';
import { Repository } from 'typeorm';
import { UserDetails } from './utils/auth-interfaces';
import { JwtService } from '@nestjs/jwt';
import { CreatePlayerDto } from '../player/dto/create-player.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(user: UserDetails): Promise<Player> {
    const { discordId } = user;
    const player: Player = await this.playerRepository.findOne({ discordId });
    if (player) return player;
    return this.createUser(user);
  }

  async createUser(user: UserDetails): Promise<Player> {
    const { username, email, discordId, avatar } = user;
    const playerToCreate: CreatePlayerDto = {
      username,
      email,
      discordId,
      avatar,
    };
    //TODO A tester cette façon de faire
    // const toto: CreatePlayerDto = await this.playerRepository.create(user);
    return await this.playerRepository.save(playerToCreate);
  }

  async login(user: Player): Promise<{ access_token }> {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
