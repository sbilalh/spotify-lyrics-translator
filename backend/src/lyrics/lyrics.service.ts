import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateLyricDto } from './dto/create-lyric.dto';
import { UpdateLyricDto } from './dto/update-lyric.dto';

@Injectable()
export class LyricsService {
  async getLyrics(songName: string, artist: string) {
    try {
      // Remove any text in parentheses from song name and artist
      const cleanSongName = songName.replace(/ \(.*?\)/g, '');
      const cleanArtist = artist.replace(/ \(.*?\)/g, '');

      // Format the URL - replace spaces with dashes and make lowercase
      const formattedArtist = cleanArtist.toLowerCase().replace(/ /g, '-');
      const formattedSong = cleanSongName.toLowerCase().replace(/ /g, '-');

      // Use lyrics.ovh API
      const response = await fetch(
        `https://api.lyrics.ovh/v1/${formattedArtist}/${formattedSong}`,
      );

      if (!response.ok) {
        throw new HttpException('Lyrics not found', HttpStatus.NOT_FOUND);
      }

      const data = await response.json();
      return { lyrics: data.lyrics };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch lyrics',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
