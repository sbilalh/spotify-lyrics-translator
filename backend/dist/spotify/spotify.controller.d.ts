import { SpotifyService } from './spotify.service';
import { LyricsService } from '../lyrics/lyrics.service';
export declare class SpotifyController {
    private readonly spotifyService;
    private readonly lyricsService;
    constructor(spotifyService: SpotifyService, lyricsService: LyricsService);
    getCurrentTrack(auth: string): Promise<{
        isPlaying: boolean;
        message: string;
    } | {
        lyrics: any;
        name: string;
        artist: string;
        isPlaying: boolean;
        progressMs: number;
        durationMs: number;
        message?: undefined;
    } | {
        lyrics: any;
        lyricsError: string;
        error: any;
        name: string;
        artist: string;
        isPlaying: boolean;
        progressMs: number;
        durationMs: number;
        message?: undefined;
    }>;
}
