import { CreateLyricDto } from './dto/create-lyric.dto';
import { UpdateLyricDto } from './dto/update-lyric.dto';
export declare class LyricsService {
    getLyrics(songName: string, artist: string): Promise<{
        lyrics: any;
    }>;
    create(createLyricDto: CreateLyricDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateLyricDto: UpdateLyricDto): string;
    remove(id: number): string;
}
