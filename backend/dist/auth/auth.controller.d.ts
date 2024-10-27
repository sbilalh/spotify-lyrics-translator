import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    spotifyLogin(): {
        url: string;
    };
    spotifyCallback(code: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
