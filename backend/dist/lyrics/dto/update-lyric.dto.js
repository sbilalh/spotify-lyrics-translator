"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLyricDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_lyric_dto_1 = require("./create-lyric.dto");
class UpdateLyricDto extends (0, mapped_types_1.PartialType)(create_lyric_dto_1.CreateLyricDto) {
}
exports.UpdateLyricDto = UpdateLyricDto;
//# sourceMappingURL=update-lyric.dto.js.map