import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DiscordStrategy } from './strategies/discord.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../player/entities/player.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, DiscordStrategy],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
