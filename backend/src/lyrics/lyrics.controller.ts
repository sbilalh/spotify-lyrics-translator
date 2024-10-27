import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LyricsService } from './lyrics.service';
import { CreateLyricDto } from './dto/create-lyric.dto';
import { UpdateLyricDto } from './dto/update-lyric.dto';

@Controller('lyrics')
export class LyricsController {
  constructor(private readonly lyricsService: LyricsService) {}

  @Get('search')
  async getLyrics(
    @Query('song') song: string,
    @Query('artist') artist: string,
  ) {
    return this.lyricsService.getLyrics(song, artist);
  }

  @Post()
  create(@Body() createLyricDto: CreateLyricDto) {
    return this.lyricsService.create(createLyricDto);
  }

  @Get()
  findAll() {
    return this.lyricsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lyricsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLyricDto: UpdateLyricDto) {
    return this.lyricsService.update(+id, updateLyricDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lyricsService.remove(+id);
  }
}
