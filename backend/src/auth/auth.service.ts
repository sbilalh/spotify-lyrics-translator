import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SpotifyWebApi = require('spotify-web-api-node');

@Injectable()
export class AuthService {
  private spotifyApi: SpotifyWebApi;

  constructor(private configService: ConfigService) {
    this.spotifyApi = new SpotifyWebApi({
      clientId: this.configService.get<string>('SPOTIFY_CLIENT_ID'),
      clientSecret: this.configService.get<string>('SPOTIFY_CLIENT_SECRET'),
      redirectUri: this.configService.get<string>('SPOTIFY_REDIRECT_URI'),
    });
  }

  getAuthorizationUrl(): string {
    const scopes = ['user-read-currently-playing', 'user-read-playback-state'];
    return this.spotifyApi.createAuthorizeURL(scopes, 'state');
  }

  async handleCallback(code: string) {
    const data = await this.spotifyApi.authorizationCodeGrant(code);
    return {
      accessToken: data.body['access_token'],
      refreshToken: data.body['refresh_token'],
      expiresIn: data.body['expires_in'],
    };
  }
}
