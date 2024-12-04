"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LyricsService = void 0;
const common_1 = require("@nestjs/common");
let LyricsService = class LyricsService {
    async getLyrics(songName, artist) {
        try {
            const cleanSongName = songName.replace(/ \(.*?\)/g, '');
            const cleanArtist = artist.replace(/ \(.*?\)/g, '');
            const formattedArtist = cleanArtist.toLowerCase().replace(/ /g, '-');
            const formattedSong = cleanSongName.toLowerCase().replace(/ /g, '-');
            const response = await fetch(`https://api.lyrics.ovh/v1/${formattedArtist}/${formattedSong}`);
            if (!response.ok) {
                throw new common_1.HttpException('Lyrics not found', common_1.HttpStatus.NOT_FOUND);
            }
            const data = await response.json();
            return { lyrics: data.lyrics };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Failed to fetch lyrics', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.LyricsService = LyricsService;
exports.LyricsService = LyricsService = __decorate([
    (0, common_1.Injectable)()
], LyricsService);
//# sourceMappingURL=lyrics.service.js.map