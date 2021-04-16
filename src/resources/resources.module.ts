import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './player/entities/player.entity';
import { Guild } from './guild/entities/guild.entity';
import { PlayerModule } from './player/player.module';
import { GuildModule } from './guild/guild.module';
import { DataLoadingService } from './data-loading.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player, Guild]),
    PlayerModule,
    GuildModule,
  ],
  providers: [DataLoadingService],
})
export class ResourcesModule {}
