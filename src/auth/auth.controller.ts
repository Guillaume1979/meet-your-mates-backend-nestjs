import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { DiscordAuthGuard } from './guards/discord.guard';
import { Response } from "express";

@Controller('auth')
export class AuthController {
  /**
   * GET /api/auth/login
   * This is the route the user will visit to authenticate
   */
  @Get('login')
  @UseGuards(DiscordAuthGuard)
  login() {
    return;
  }

  /**
   * GET /api/auth/redirect
   * This is the redirect URL the OAuth2 provider will call
   */
  @Get('redirect')
  @UseGuards(DiscordAuthGuard)
  redirect(@Res() res: Response) {
    res.send(200);
  }

  /**
   * GET /api/auth/status
   * Retrieve the auth status
   */
  @Get('status')
  status() {}

  /**
   * GET /api/auth/logout
   * Logging the user out
   */
  @Get('logout')
  logout() {}
}
