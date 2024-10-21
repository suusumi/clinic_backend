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
exports.BannersController = void 0;
const common_1 = require("@nestjs/common");
const banners_service_1 = require("./banners.service");
const create_banner_dto_1 = require("./dto/create-banner.dto");
const update_banner_dto_1 = require("./dto/update-banner.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let BannersController = exports.BannersController = class BannersController {
    constructor(bannersService) {
        this.bannersService = bannersService;
    }
    async create(createBannerDto) {
        return await this.bannersService.create(createBannerDto);
    }
    async findAll() {
        return await this.bannersService.findAll();
    }
    async findOne(id) {
        return await this.bannersService.findOne(+id);
    }
    async update(id, updateBannerDto) {
        return await this.bannersService.update(+id, updateBannerDto);
    }
    async updateImage(id, file) {
        if (file) {
            return await this.bannersService.updateImage(+id, file.filename);
        }
        else {
            console.log('Всё сломалось при обновлении изображения баннера на сервере');
        }
    }
    async remove(id) {
        return await this.bannersService.remove(+id);
    }
    async createBannerWithImage(file, bodyData) {
        const jsonString = JSON.stringify(bodyData);
        const parsedObject = JSON.parse(jsonString);
        const bodyDataString = parsedObject.bodyData;
        const createBannerDto = JSON.parse(bodyDataString);
        if (file) {
            createBannerDto.img_path = file.filename;
            return await this.bannersService.create(createBannerDto);
        }
        else {
            console.log('Всё сломалось при загрузке изображения баннера на сервер');
        }
    }
};
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_banner_dto_1.CreateBannerDto]),
    __metadata("design:returntype", Promise)
], BannersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BannersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BannersController.prototype, "findOne", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_banner_dto_1.UpdateBannerDto]),
    __metadata("design:returntype", Promise)
], BannersController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('updateimage/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './public/uploads',
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                return cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BannersController.prototype, "updateImage", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BannersController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('createwithimage'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './public/uploads',
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                return cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_banner_dto_1.CreateBannerDto]),
    __metadata("design:returntype", Promise)
], BannersController.prototype, "createBannerWithImage", null);
exports.BannersController = BannersController = __decorate([
    (0, common_1.Controller)('banners'),
    __metadata("design:paramtypes", [banners_service_1.BannersService])
], BannersController);
//# sourceMappingURL=banners.controller.js.map