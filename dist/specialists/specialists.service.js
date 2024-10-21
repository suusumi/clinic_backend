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
exports.SpecialistsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const fs = require("fs");
let SpecialistsService = exports.SpecialistsService = class SpecialistsService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async create(createSpecialistDto) {
        try {
            return await this.databaseService.specialists.create({
                data: createSpecialistDto,
            });
        }
        catch (error) {
            console.error('Ошибка при создании специалиста:', error);
        }
    }
    async findAll() {
        try {
            return await this.databaseService.specialists.findMany();
        }
        catch (error) {
            console.error('Ошибка при получении списка специалистов:', error);
        }
    }
    async findOne(id) {
        try {
            const specialist = await this.databaseService.specialists.findUnique({
                where: { id },
            });
            if (!specialist) {
                throw new Error(`Специалист с ID ${id} не найден`);
            }
            return specialist;
        }
        catch (error) {
            console.error(`Ошибка при поиске специалиста с ID ${id}:`, error);
        }
    }
    async update(id, updateSpecialistDto) {
        try {
            const updatedSpecialist = await this.databaseService.specialists.update({
                where: { id },
                data: updateSpecialistDto,
            });
            if (!updatedSpecialist) {
                throw new Error(`Специалист с ID ${id} не найден`);
            }
            return updatedSpecialist;
        }
        catch (error) {
            console.error(`Ошибка при обновлении специалиста с ID ${id}:`, error);
        }
    }
    async updatePhoto(id, photoPath) {
        try {
            const updateSpecialistDto = {};
            updateSpecialistDto.photo_path = photoPath;
            const specialist = await this.databaseService.specialists.findUnique({
                where: { id },
            });
            try {
                fs.unlinkSync('./public/uploads/' + specialist.photo_path);
                console.log('Старое фото перед апдейтом фото специалиста успешно удалено: ./public/uploads/', specialist.photo_path);
            }
            catch (err) {
                console.error('Ошибка при удалении файла:', err);
            }
            const updatedSpecialist = await this.databaseService.specialists.update({
                where: { id },
                data: updateSpecialistDto,
            });
            if (!updatedSpecialist) {
                throw new Error(`Специалист с ID ${id} не найден`);
            }
            return updatedSpecialist;
        }
        catch (error) {
            console.error(`Ошибка при обновлении фотографии специалиста с ID ${id}:`, error);
        }
    }
    async remove(id) {
        try {
            const deletedSpecialist = await this.databaseService.specialists.delete({
                where: {
                    id: id,
                },
            });
            if (!deletedSpecialist) {
                throw new Error(`Специалист с ID ${id} не найден`);
            }
            try {
                fs.unlinkSync('./public/uploads/' + deletedSpecialist.photo_path);
                console.log('Файл с фото специалиста при удалении специалиста успешно удален: ./public/uploads/', deletedSpecialist.photo_path);
            }
            catch (err) {
                console.error('Ошибка при удалении файла:', err);
            }
            return deletedSpecialist;
        }
        catch (error) {
            console.error(`Ошибка при удалении специалиста с ID ${id}:`, error);
        }
    }
};
exports.SpecialistsService = SpecialistsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], SpecialistsService);
//# sourceMappingURL=specialists.service.js.map