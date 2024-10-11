import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  spotifyLogin() {
    return { url: this.authService.getAuthorizationUrl() };
  }

  @Get('callback')
  @UseGuards(AuthGuard('spotify'))
  async spotifyCallback(@Query('code') code: string, @Res() res: Response) {
    const tokens = await this.authService.handleCallback(code);
    // In a real-world scenario, you'd want to securely store these tokens and associate them with a user session
    res.cookie('spotify_access_token', tokens.accessToken, { httpOnly: true });
    res.redirect('/dashboard'); // Redirect to the frontend dashboard
  }
}
