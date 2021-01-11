import { Module } from '@nestjs/common';
import { GuildService } from './guild.service';
import { GuildController } from './guild.controller';

@Module({
  controllers: [GuildController],
  providers: [GuildService]
})
export class GuildModule {}
