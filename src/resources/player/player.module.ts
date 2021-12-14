import { Global, Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { GuildService } from '../guild/guild.service';
import { Guild } from '../guild/entities/guild.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Player, Guild])],
  controllers: [PlayerController],
  providers: [PlayerService, GuildService],
  exports: [],
})
export class PlayerModule {}
