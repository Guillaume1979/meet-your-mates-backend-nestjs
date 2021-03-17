import { PlayerService } from './player.service';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Player } from './entities/player.entity';
import { Public } from '../auth/utils/public-decorator';

@Resolver((of) => Player)
export class PlayerResolver {
  constructor(private readonly playerService: PlayerService) {}

  @Public()
  @Query((returns) => Player, { name: 'player' })
  async getPlayer(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Player> {
    return this.playerService.getPlayerById(id);
  }
}
