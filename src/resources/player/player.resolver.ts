import { PlayerService } from './player.service';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Player } from './entities/player.entity';
import { Public } from '../../auth/utils/public-decorator';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PaginatedResultDto } from '../../generic/paginated-result.dto';
import { PaginationDto } from '../../generic/pagination.dto';

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

  @Public()
  @Query(() => PaginatedResultDto, {
    name: 'playerList',
    description: 'Get a paginated list of players',
  })
  async getPlayers(
    @Args('paginationInput', { type: () => PaginationDto }) data: PaginationDto,
  ): Promise<PaginatedResultDto> {
    return this.playerService.getPlayers(data);
  }

  @Mutation((returns) => Player)
  async updatePlayer(
    @Args('id', { type: () => Int }) id: number,
    @Args('player')
    playerToUpdate: UpdatePlayerDto,
  ): Promise<Partial<Player>> {
    return this.playerService.updatePlayer(id, playerToUpdate);
  }

  @Mutation(() => Player)
  deletePlayer(@Args('id', { type: () => Int }) id: number): Promise<Player> {
    return this.playerService.deletePlayer(id);
  }
}
