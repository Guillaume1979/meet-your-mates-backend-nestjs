import { Injectable } from '@nestjs/common';
import { PlayerService } from "../player/player.service";

@Injectable()
export class AuthService {
  constructor(private playerService: PlayerService) {}

  // async findUserFromDiscordId(discordId: string): Promise<any> {
  //   const user = await this.playerService.getPlayerById()
  // }
}
