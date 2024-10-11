import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-spotify';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy, 'spotify') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('SPOTIFY_CLIENT_ID'),
      clientSecret: configService.get<string>('SPOTIFY_CLIENT_SECRET'),
      callbackURL: configService.get<string>('SPOTIFY_REDIRECT_URI'),
      scope: ['user-read-currently-playing', 'user-read-playback-state'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    return { accessToken, refreshToken, profile };
  }
}
