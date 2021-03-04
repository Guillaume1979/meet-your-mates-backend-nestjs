import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { PlayerModule } from '../player/player.module';
import { AuthController } from './auth.controller';
import { DiscordStrategy } from './strategies/discord.strategy';

@Module({
  imports: [
    // PassportModule.register({ defaultStrategy: 'bearer' }),
    PlayerModule,
  ],
  providers: [AuthService, DiscordStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
