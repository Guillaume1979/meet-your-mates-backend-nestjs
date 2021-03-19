import { PlayerService } from './player.service';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Player } from './entities/player.entity';
import { Public } from '../auth/utils/public-decorator';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Resolver((of) => Player)
export class PlayerResolver {
  constructor(private readonly playerService: PlayerService) {}

  @Public()
  @Query((returns) => Player, {
    name: 'player',
    description: 'Get the information about the player corresponding to the id',
  })
  async getPlayer(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Partial<Player>> {
    return this.playerService.getPlayerById(id);
  }

  @Mutation((returns) => Player)
  async updatePlayer(
    @Args('id', { type: () => Int }) id: number,
    @Args('player')
    playerToUpdate: UpdatePlayerDto,
  ): Promise<Partial<Player>> {
    return this.playerService.updatePlayer(id, playerToUpdate);
  }
}
