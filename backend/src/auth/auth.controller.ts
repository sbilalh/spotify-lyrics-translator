import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  spotifyLogin() {
    const url = this.authService.getAuthorizationUrl();
    console.log('Generated authorization URL:', url); // Debug log
    return { url };
  }

  @Get('callback')
  async spotifyCallback(@Query('code') code: string, @Res() res: Response) {
    console.log('Received callback with code:', code);
    try {
      const tokens = await this.authService.handleCallback(code);
      console.log('Received tokens:', tokens);
      return res.json({
        message: 'Authentication successful',
        accessToken: tokens.accessToken, // Changed from nested tokens object
        expiresIn: tokens.expiresIn,
      });
    } catch (error) {
      console.error('Auth error:', error);
      throw error;
    }
  }
}
