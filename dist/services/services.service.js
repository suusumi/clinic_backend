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
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let ServicesService = exports.ServicesService = class ServicesService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async create(createServiceDto) {
        try {
            return await this.databaseService.services.create({
                data: createServiceDto,
            });
        }
        catch (error) {
            throw new common_1.HttpException(`Ошибка при созданиии услуги` + error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        try {
            return await this.databaseService.services.findMany();
        }
        catch (error) {
            throw new common_1.HttpException(`Ошибка при получения списка услуг с БД:` + error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const service = await this.databaseService.services.findUnique({
                where: { id },
            });
            if (!service) {
                throw new Error(`Услуга с ID ${id} не найдена`);
            }
            return service;
        }
        catch (error) {
            throw new common_1.HttpException(`Ошибка при поиске услуги с ID ${id}:` + error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findServicesBySubCategory(sub_category_id) {
        try {
            const services = await this.databaseService.services.findMany({
                where: { sub_category_id: sub_category_id },
            });
            if (!services) {
                throw new Error(`Услуги с подкатегорией ${sub_category_id} не найдены`);
            }
            return services;
        }
        catch (error) {
            throw new common_1.HttpException(`Ошибка при поиске услуг с подкатегорией ${sub_category_id}:` + error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateServiceDto) {
        try {
            const updatedService = await this.databaseService.services.update({
                where: { id },
                data: updateServiceDto,
            });
            if (!updatedService) {
                throw new Error(`Услуга с ID ${id} не найдена`);
            }
            return updatedService;
        }
        catch (error) {
            throw new common_1.HttpException(`Ошибка при обновлении услуги с ID ${id}:` + error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const deletedService = await this.databaseService.services.delete({
                where: {
                    id: id
                }
            });
            if (!deletedService) {
                throw new Error(`Услуга с ID ${id} не найдена`);
            }
            return deletedService;
        }
        catch (error) {
            throw new common_1.HttpException(`Ошибка при удалении услуги с ID ${id}:` + error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ServicesService);
//# sourceMappingURL=services.service.js.map