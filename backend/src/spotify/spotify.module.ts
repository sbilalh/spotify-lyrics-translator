import { Module } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { SpotifyController } from './spotify.controller';
import { LyricsService } from '../lyrics/lyrics.service';

@Module({
  controllers: [SpotifyController],
  providers: [SpotifyService, LyricsService],
})
export class SpotifyModule {}
