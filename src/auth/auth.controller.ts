import { Controller, Get, Post, Req, Request, Res, UseGuards } from "@nestjs/common";
import { DiscordAuthGuard } from './guards/discord.guard';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from "./utils/public-decorator";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * GET /api/auth/login
   * This is the route the user will visit to authenticate
   */
  @Public()
  @Get('login')
  @UseGuards(DiscordAuthGuard)
  login() {
    return;
  }

  /**
   * GET /api/auth/redirect
   * This is the redirect URL the OAuth2 provider will call
   */
  @Public()
  @Get('redirect')
  @UseGuards(DiscordAuthGuard)
  redirect(@Req() req) {
    return this.authService.login(req.user);
  }

  /**
   * GET /api/auth/status
   * Retrieve the auth status
   */
  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Request() req) {
    // this.authService.
    return req.player;
  }

  /**
   * GET /api/auth/logout
   * Logging the user out
   */
  @Get('logout')
  logout() {}
}
