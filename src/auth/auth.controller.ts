import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpService,
  NotFoundException,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { DiscordAuthGuard } from './guards/discord.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from './utils/public-decorator';
import { Player } from '../resources/player/entities/player.entity';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface DiscordToken {
  access_token: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly httpService: HttpService,
  ) {}

  /**
   * GET /api/auth/login
   * This is the route the user will visit to authenticate
   */

  /*  @Public()
    @Get('login')
    @UseGuards(DiscordAuthGuard)
    // @Header('Access-Control-Allow-Origin', 'http://localhost:4200')
    login() {
      return;
    }*/
  @Public()
  @Post('login')
  login(@Body() token: DiscordToken): Observable<Player> {
    if (token.access_token !== 'null') {
      const player = this.httpService
        .get('https://discord.com/api/v8/users/@me', {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        })
        .pipe(
          map((discordResponse) => {
            console.log(discordResponse.data);
            let player = new Player();
            player.username = discordResponse.data.username;
            return player;
          }),
        );
      // todo revoir la gestion des erreurs 401 quand erreur dans la requete
      if (player) {
        return player;
      } else {
        throw new NotFoundException(
          "Player not found or Discord API doesn't respond",
        );
      }
    } else {
      throw new BadRequestException('Discord token left');
    }
  }

  /**
   * GET /api/auth/redirect
   * This is the redirect URL the OAuth2 provider will call
   */
  @Public()
  @Get('redirect')
  @UseGuards(DiscordAuthGuard)
  redirect(@Req() req, @Res() res) {
    //todo A changer
    return this.authService.login(req.user);
    // res.send(200);
  }

  /**
   * GET /api/auth/status
   * Retrieve the auth status
   */
  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Request() req) {
    return req.player;
  }

  /**
   * GET /api/auth/logout
   * Logging the user out
   */
  @Get('logout')
  logout() {}
}
