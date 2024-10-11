import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LyricsModule } from './lyrics/lyrics.module';
import { SpotifyModule } from './spotify/spotify.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, SpotifyModule, LyricsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
