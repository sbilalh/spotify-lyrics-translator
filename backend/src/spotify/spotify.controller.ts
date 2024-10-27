import {
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { LyricsService } from '../lyrics/lyrics.service';

@Controller('spotify')
export class SpotifyController {
  constructor(
    private readonly spotifyService: SpotifyService,
    private readonly lyricsService: LyricsService,
  ) {}

  @Get('current-track')
  async getCurrentTrack(@Headers('authorization') auth: string) {
    if (!auth) {
      throw new HttpException(
        'No authorization token provided',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = auth.replace('Bearer ', '');

    try {
      const track = await this.spotifyService.getCurrentTrack(token);

      if (!track) {
        return {
          isPlaying: false,
          message: 'No track currently playing',
        };
      }

      // Fetch lyrics for the current track
      try {
        const lyrics = await this.lyricsService.getLyrics(
          track.name,
          track.artist,
        );
        return {
          ...track,
          lyrics: lyrics.lyrics,
        };
      } catch (error) {
        // If lyrics fetch fails, still return track info but with error message
        return {
          ...track,
          lyrics: null,
          lyricsError: 'Could not fetch lyrics',
          error,
        };
      }
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch current track',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
