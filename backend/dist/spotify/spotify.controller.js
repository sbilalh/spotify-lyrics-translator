"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyController = void 0;
const common_1 = require("@nestjs/common");
const spotify_service_1 = require("./spotify.service");
const lyrics_service_1 = require("../lyrics/lyrics.service");
let SpotifyController = class SpotifyController {
    constructor(spotifyService, lyricsService) {
        this.spotifyService = spotifyService;
        this.lyricsService = lyricsService;
    }
    async getCurrentTrack(auth) {
        if (!auth) {
            throw new common_1.HttpException('No authorization token provided', common_1.HttpStatus.UNAUTHORIZED);
        }
        const token = auth.replace('Bearer ', '');
        try {
            const track = await this.spotifyService.getCurrentTrack(token);
            if (!track) {
                return {
                    isPlaying: false,
                    message: 'No track currently playing',
                };
            }
            try {
                const lyrics = await this.lyricsService.getLyrics(track.name, track.artist);
                return {
                    ...track,
                    lyrics: lyrics.lyrics,
                };
            }
            catch (error) {
                return {
                    ...track,
                    lyrics: null,
                    lyricsError: 'Could not fetch lyrics',
                    error,
                };
            }
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to fetch current track', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.SpotifyController = SpotifyController;
__decorate([
    (0, common_1.Get)('current-track'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SpotifyController.prototype, "getCurrentTrack", null);
exports.SpotifyController = SpotifyController = __decorate([
    (0, common_1.Controller)('spotify'),
    __metadata("design:paramtypes", [spotify_service_1.SpotifyService,
        lyrics_service_1.LyricsService])
], SpotifyController);
//# sourceMappingURL=spotify.controller.js.map