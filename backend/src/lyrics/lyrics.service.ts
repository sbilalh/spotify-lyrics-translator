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

  create(createLyricDto: CreateLyricDto) {
    return 'This action adds a new lyric';
  }

  findAll() {
    return `This action returns all lyrics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lyric`;
  }

  update(id: number, updateLyricDto: UpdateLyricDto) {
    return `This action updates a #${id} lyric`;
  }

  remove(id: number) {
    return `This action removes a #${id} lyric`;
  }
}
