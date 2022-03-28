import { Controller, Get, Param } from '@nestjs/common';
import { GuildService } from './guild.service';

@Controller('guilds')
export class GuildController {
  constructor(private readonly guildService: GuildService) {}

  // todo : User decorateur partout ?

  @Get()
  findAll() {
    return this.guildService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guildService.findOne(+id);
  }
}
