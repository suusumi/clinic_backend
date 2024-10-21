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
exports.BannersService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const fs = require("fs");
let BannersService = exports.BannersService = class BannersService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async create(createBannerDto) {
        try {
            return await this.databaseService.banners.create({
                data: createBannerDto,
            });
        }
        catch (error) {
            console.error('Ошибка при создании баннера:', error);
        }
    }
    async findAll() {
        try {
            return await this.databaseService.banners.findMany();
        }
        catch (error) {
            console.error('Ошибка при получении списка баннеров:', error);
        }
    }
    async findOne(id) {
        try {
            const banner = await this.databaseService.banners.findUnique({
                where: { id },
            });
            if (!banner) {
                throw new Error(`Баннер с ID ${id} не найден`);
            }
            return banner;
        }
        catch (error) {
            console.error(`Ошибка при поиске баннера с ID ${id}:`, error);
        }
    }
    async update(id, updateBannerDto) {
        try {
            const updatedBanner = await this.databaseService.banners.update({
                where: { id },
                data: updateBannerDto,
            });
            if (!updatedBanner) {
                throw new Error(`Баннер с ID ${id} не найден`);
            }
            return updatedBanner;
        }
        catch (error) {
            console.error(`Ошибка при обновлении баннера с ID ${id}:`, error);
        }
    }
    async updateImage(id, imgPath) {
        try {
            const updateBannerDto = {};
            updateBannerDto.img_path = imgPath;
            const banner = await this.databaseService.banners.findUnique({
                where: { id },
            });
            try {
                fs.unlinkSync('./public/uploads/' + banner.img_path);
                console.log('Старое изображение перед апдейтом изображения баннера успешно удалено: ./public/uploads/', banner.img_path);
            }
            catch (err) {
                console.error('Ошибка при удалении файла:', err);
            }
            const updatedBanner = await this.databaseService.banners.update({
                where: { id },
                data: updateBannerDto,
            });
            if (!updatedBanner) {
                throw new Error(`Баннер с ID ${id} не найден`);
            }
            return updatedBanner;
        }
        catch (error) {
            console.error(`Ошибка при обновлении пути к изображению для баннера с ID ${id}:`, error);
        }
    }
    async remove(id) {
        try {
            const deletedBanner = await this.databaseService.banners.delete({
                where: {
                    id: id,
                },
            });
            if (!deletedBanner) {
                throw new Error(`Баннер с ID ${id} не найден`);
            }
            try {
                fs.unlinkSync('./public/uploads/' + deletedBanner.img_path);
                console.log('Изображение баннера при удалении баннера успешно удалено: ./public/uploads/', deletedBanner.img_path);
            }
            catch (err) {
                console.error('Ошибка при удалении файла:', err);
            }
            return deletedBanner;
        }
        catch (error) {
            console.error(`Ошибка при удалении баннера с ID ${id}:`, error);
        }
    }
};
exports.BannersService = BannersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], BannersService);
//# sourceMappingURL=banners.service.js.map