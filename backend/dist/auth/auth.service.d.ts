import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private configService;
    private spotifyApi;
    constructor(configService: ConfigService);
    getAuthorizationUrl(): string;
    handleCallback(code: string): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }>;
}
