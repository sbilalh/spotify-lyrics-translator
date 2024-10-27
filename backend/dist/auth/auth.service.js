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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const SpotifyWebApi = require("spotify-web-api-node");
let AuthService = class AuthService {
    constructor(configService) {
        this.configService = configService;
        this.spotifyApi = new SpotifyWebApi({
            clientId: this.configService.get('SPOTIFY_CLIENT_ID'),
            clientSecret: this.configService.get('SPOTIFY_CLIENT_SECRET'),
            redirectUri: this.configService.get('SPOTIFY_REDIRECT_URI'),
        });
    }
    getAuthorizationUrl() {
        const scopes = ['user-read-currently-playing', 'user-read-playback-state'];
        return this.spotifyApi.createAuthorizeURL(scopes, 'state');
    }
    async handleCallback(code) {
        const data = await this.spotifyApi.authorizationCodeGrant(code);
        return {
            accessToken: data.body['access_token'],
            refreshToken: data.body['refresh_token'],
            expiresIn: data.body['expires_in'],
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map