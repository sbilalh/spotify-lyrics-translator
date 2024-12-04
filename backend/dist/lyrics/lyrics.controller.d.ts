import { LyricsService } from './lyrics.service';
import { CreateLyricDto } from './dto/create-lyric.dto';
import { UpdateLyricDto } from './dto/update-lyric.dto';
export declare class LyricsController {
    private readonly lyricsService;
    constructor(lyricsService: LyricsService);
    getLyrics(song: string, artist: string): Promise<{
        lyrics: any;
    }>;
    create(createLyricDto: CreateLyricDto): any;
    findAll(): any;
    findOne(id: string): any;
    update(id: string, updateLyricDto: UpdateLyricDto): any;
    remove(id: string): any;
}
