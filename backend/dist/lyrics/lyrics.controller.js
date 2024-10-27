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
exports.LyricsController = void 0;
const common_1 = require("@nestjs/common");
const lyrics_service_1 = require("./lyrics.service");
const create_lyric_dto_1 = require("./dto/create-lyric.dto");
const update_lyric_dto_1 = require("./dto/update-lyric.dto");
let LyricsController = class LyricsController {
    constructor(lyricsService) {
        this.lyricsService = lyricsService;
    }
    async getLyrics(song, artist) {
        return this.lyricsService.getLyrics(song, artist);
    }
    create(createLyricDto) {
        return this.lyricsService.create(createLyricDto);
    }
    findAll() {
        return this.lyricsService.findAll();
    }
    findOne(id) {
        return this.lyricsService.findOne(+id);
    }
    update(id, updateLyricDto) {
        return this.lyricsService.update(+id, updateLyricDto);
    }
    remove(id) {
        return this.lyricsService.remove(+id);
    }
};
exports.LyricsController = LyricsController;
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('song')),
    __param(1, (0, common_1.Query)('artist')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LyricsController.prototype, "getLyrics", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lyric_dto_1.CreateLyricDto]),
    __metadata("design:returntype", void 0)
], LyricsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LyricsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LyricsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_lyric_dto_1.UpdateLyricDto]),
    __metadata("design:returntype", void 0)
], LyricsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LyricsController.prototype, "remove", null);
exports.LyricsController = LyricsController = __decorate([
    (0, common_1.Controller)('lyrics'),
    __metadata("design:paramtypes", [lyrics_service_1.LyricsService])
], LyricsController);
//# sourceMappingURL=lyrics.controller.js.map