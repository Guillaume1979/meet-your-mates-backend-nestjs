import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../decorator/public-decorator';
import { DiscordToken } from './utils/auth-interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * GET /api/auth/login
   * This is the route the user will visit to authenticate
   */
  @Public()
  @Post('login')
  login(@Body() token: DiscordToken): Promise<{ mym_token }> {
    if (token.access_token) {
      console.log('discord token', token);
      return this.authService.login(token);
    } else {
      throw new HttpException('Discord token left', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * GET /api/auth/logout
   * Logging the user out
   * Revoke the jwt token
   */
  @Get('logout')
  logout() {}
}
