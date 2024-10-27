import { LyricsService } from './lyrics.service';
import { CreateLyricDto } from './dto/create-lyric.dto';
import { UpdateLyricDto } from './dto/update-lyric.dto';
export declare class LyricsController {
    private readonly lyricsService;
    constructor(lyricsService: LyricsService);
    getLyrics(song: string, artist: string): Promise<{
        lyrics: any;
    }>;
    create(createLyricDto: CreateLyricDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateLyricDto: UpdateLyricDto): string;
    remove(id: string): string;
}
