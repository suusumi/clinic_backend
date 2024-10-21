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
exports.SpecialistsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const specialists_service_1 = require("./specialists.service");
const create_specialist_dto_1 = require("./dto/create-specialist.dto");
const update_specialist_dto_1 = require("./dto/update-specialist.dto");
let SpecialistsController = exports.SpecialistsController = class SpecialistsController {
    constructor(specialistsService) {
        this.specialistsService = specialistsService;
    }
    async create(createSpecialistDto) {
        return await this.specialistsService.create(createSpecialistDto);
    }
    async findAll() {
        return await this.specialistsService.findAll();
    }
    async findOne(id) {
        return this.specialistsService.findOne(+id);
    }
    async update(id, updateSpecialistDto) {
        return await this.specialistsService.update(+id, updateSpecialistDto);
    }
    async updatePhoto(id, file) {
        if (file) {
            return await this.specialistsService.updatePhoto(+id, file.filename);
        }
        else {
            console.log('Всё сломалось при обновлении фото специалиста на сервере');
        }
    }
    async remove(id) {
        return await this.specialistsService.remove(+id);
    }
    async createSpecialistWithImage(file, bodyData) {
        const jsonString = JSON.stringify(bodyData);
        const parsedObject = JSON.parse(jsonString);
        const bodyDataString = parsedObject.bodyData;
        const createSpecialistDto = JSON.parse(bodyDataString);
        if (file) {
            createSpecialistDto.photo_path = file.filename;
            return await this.specialistsService.create(createSpecialistDto);
        }
        else {
            console.log('Всё сломалось при загрузке фото специалиста на сервер');
        }
    }
};
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_specialist_dto_1.CreateSpecialistDto]),
    __metadata("design:returntype", Promise)
], SpecialistsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SpecialistsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SpecialistsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_specialist_dto_1.UpdateSpecialistDto]),
    __metadata("design:returntype", Promise)
], SpecialistsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('updatephoto/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('photo', {
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
], SpecialistsController.prototype, "updatePhoto", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SpecialistsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('createwithphoto'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('photo', {
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
    __metadata("design:paramtypes", [Object, create_specialist_dto_1.CreateSpecialistDto]),
    __metadata("design:returntype", Promise)
], SpecialistsController.prototype, "createSpecialistWithImage", null);
exports.SpecialistsController = SpecialistsController = __decorate([
    (0, common_1.Controller)('specialists'),
    __metadata("design:paramtypes", [specialists_service_1.SpecialistsService])
], SpecialistsController);
//# sourceMappingURL=specialists.controller.js.map