import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { GuildService } from './guild.service';
import { CreateGuildDto } from './dto/create-guild.dto';
import { UpdateGuildDto } from './dto/update-guild.dto';

@Controller('guilds')
export class GuildController {
  constructor(private readonly guildService: GuildService) {}

  @Post()
  create(@Body() createGuildDto: CreateGuildDto) {
    return this.guildService.create(createGuildDto);
  }

  @Get()
  findAll() {
    return this.guildService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guildService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateGuildDto: UpdateGuildDto) {
    return this.guildService.update(+id, updateGuildDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guildService.remove(+id);
  }
}
