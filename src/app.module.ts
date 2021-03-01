import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './player/player.module';
import { GuildModule } from './guild/guild.module';
import { DatabaseModule } from './config/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { DataLoadingService } from './data-loading.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './player/entities/player.entity';
import { Guild } from './guild/entities/guild.entity';
import { TechnicalRoleModule } from './technical-role/technical-role.module';
import { TechnicalRole } from './technical-role/technical.role';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.prod', '.env.dev'],
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([Player, Guild, TechnicalRole]),
    PlayerModule,
    GuildModule,
    DatabaseModule,
    TechnicalRoleModule,
  ],
  controllers: [AppController],
  providers: [AppService, DataLoadingService],
  exports: [ConfigModule],
})
export class AppModule {}
