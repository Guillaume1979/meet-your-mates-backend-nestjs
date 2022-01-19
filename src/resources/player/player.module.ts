import { Global, Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { GuildService } from '../guild/guild.service';
import { Guild } from '../guild/entities/guild.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../../auth/utils/constants';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Player, Guild]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '43200s' }, //12 hours
    }),
  ],
  controllers: [PlayerController],
  providers: [PlayerService, GuildService],
  exports: [],
})
export class PlayerModule {}
