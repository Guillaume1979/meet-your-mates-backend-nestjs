import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { GuildService } from './guild.service';
import { CreateGuildDto } from './dto/create-guild.dto';
import { UpdateGuildDto } from './dto/update-guild.dto';

@Controller('guilds')
export class GuildController {
  constructor(private readonly guildService: GuildService) {}

  // todo : User decorateur partout ?

  @Get()
  findAll() {
    return this.guildService.findAll();
  }

  // @Get(':playerId')
  // findAllByPlayer(@Param('playerId', ParseIntPipe) playerId: number) {
  //   return this.guildService.findAll(+playerId);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guildService.findOne(+id);
  }

  // @Get('countGuildMembers/:guildId')
  // getPlayersWithDeleted(
  //   @Param('guildId', ParseIntPipe) guildId: number,
  // ): Promise<number> {
  //   return this.guildService.countGuildMembers(+guildId);
  // }
}
