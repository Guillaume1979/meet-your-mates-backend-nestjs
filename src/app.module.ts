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
import { AuthModule } from './auth/auth.module';

const environment =
  process.env.ENVIRONMENT === 'prod' ? '.env.prod' : '.env.dev';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', environment],
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([Player, Guild, TechnicalRole]),
    PlayerModule,
    GuildModule,
    DatabaseModule,
    TechnicalRoleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, DataLoadingService],
  exports: [ConfigModule],
})
export class AppModule {}
