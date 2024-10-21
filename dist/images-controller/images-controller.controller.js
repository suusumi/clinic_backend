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
exports.ImagesControllerController = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
let ImagesControllerController = exports.ImagesControllerController = class ImagesControllerController {
    async getImage(img_path, res) {
        try {
            const filePath = path.join('public', 'uploads', img_path);
            console.log("Пытаемся отдать на клиента файл по пути: " + filePath);
            if (!fs.existsSync(filePath)) {
                throw new common_1.NotFoundException('Image does NOT exist');
            }
            const fileExtension = path.extname(filePath).toLowerCase();
            const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];
            if (!imageExtensions.includes(fileExtension)) {
                throw new common_1.BadRequestException('Not an image');
            }
            const imageStream = fs.createReadStream(filePath);
            imageStream.on('error', (error) => {
                if (error) {
                    throw new common_1.NotFoundException('Image not found');
                }
                else {
                    throw error;
                }
            });
            imageStream.pipe(res);
        }
        catch (error) {
            res.status(404).send('Image not found ' + error.message);
        }
    }
};
__decorate([
    (0, common_1.Get)(':img_path'),
    __param(0, (0, common_1.Param)('img_path')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ImagesControllerController.prototype, "getImage", null);
exports.ImagesControllerController = ImagesControllerController = __decorate([
    (0, common_1.Controller)('images')
], ImagesControllerController);
//# sourceMappingURL=images-controller.controller.js.map