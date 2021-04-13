import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Guild } from './entities/guild.entity';
import { GuildService } from './guild.service';

@Resolver(() => Guild)
export class GuildResolver {
  constructor(private readonly guildService: GuildService) {}

  @Query(() => [Guild])
  async getGuilds(): Promise<Guild[]> {
    return await this.guildService.findAll();
  }

  @Query(() => Guild)
  async getGuildById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Guild> {
    return await this.guildService.findOne(id);
  }
}
