import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-discord';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('OAUTH2_DISCORD_CLIENT_ID'),
      clientSecret: configService.get('OAUTH2_DISCORD_CLIENT_SECRET'),
      callbackURL: configService.get('OAUTH2_DISCORD_CALLBACK_URL'),
      scope: ['identify', 'email', 'guilds'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { username, id, email, avatar } = profile;
    console.log(username, id, email, avatar);
  }
}
