import { ConfigService } from '@nestjs/config';
export declare class SpotifyService {
    private configService;
    private spotifyApi;
    constructor(configService: ConfigService);
    getCurrentTrack(accessToken: string): Promise<{
        name: string;
        artist: string;
        isPlaying: boolean;
        progressMs: number;
        durationMs: number;
    }>;
}
