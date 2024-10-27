/* eslint-disable @typescript-eslint/no-require-imports */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SpotifyWebApi = require('spotify-web-api-node');

@Injectable()
export class SpotifyService {
  private spotifyApi: SpotifyWebApi;

  constructor(private configService: ConfigService) {
    this.spotifyApi = new SpotifyWebApi({
      clientId: this.configService.get<string>('SPOTIFY_CLIENT_ID'),
      clientSecret: this.configService.get<string>('SPOTIFY_CLIENT_SECRET'),
      redirectUri: this.configService.get<string>('SPOTIFY_REDIRECT_URI'),
    });
  }

  async getCurrentTrack(accessToken: string) {
    this.spotifyApi.setAccessToken(accessToken);
    try {
      const response = await this.spotifyApi.getMyCurrentPlayingTrack();
      if (response.body && response.body.item) {
        return {
          name: response.body.item.name,
          artist:
            'artists' in response.body.item
              ? response.body.item.artists[0].name
              : 'Podcast',
          isPlaying: response.body.is_playing,
          progressMs: response.body.progress_ms,
          durationMs: response.body.item.duration_ms,
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting current track:', error);
      throw error;
    }
  }
}
