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
exports.InphographicsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let InphographicsService = exports.InphographicsService = class InphographicsService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async create(createInphographicDto) {
        try {
            return await this.databaseService.infographics.create({
                data: createInphographicDto,
            });
        }
        catch (error) {
            console.error("Ошибка при создании инфографики:", error);
        }
    }
    async findAll() {
        try {
            return await this.databaseService.infographics.findMany();
        }
        catch (error) {
            console.error("Ошибка при получении списка инфографики в БД:", error);
        }
    }
    async findOne(id) {
        try {
            const inphographics = await this.databaseService.infographics.findUnique({
                where: { id },
            });
            if (!inphographics) {
                throw new Error(`Инфографика с ID ${id} не найдена`);
            }
            return inphographics;
        }
        catch (error) {
            console.error(`Ошибка при поиске инфографики с ID ${id}:`, error);
        }
    }
    async update(id, updateInphographicDto) {
        try {
            const updatedInphographics = await this.databaseService.infographics.update({
                where: { id },
                data: updateInphographicDto,
            });
            if (!updatedInphographics) {
                throw new Error(`Инфографика с ID ${id} не найдена`);
            }
            return updatedInphographics;
        }
        catch (error) {
            console.error(`Ошибка при обновлении инфографики с ID ${id}:`, error);
        }
    }
    async remove(id) {
        try {
            const deletedInphographics = await this.databaseService.infographics.delete({
                where: {
                    id: id
                }
            });
            if (!deletedInphographics) {
                throw new Error(`Инфографика с ID ${id} не найдена`);
            }
            return deletedInphographics;
        }
        catch (error) {
            console.error(`Ошибка при удалении инфографики с ID ${id}:`, error);
        }
    }
    async removeAll() {
        try {
            const deletedInphographicsCount = await this.databaseService.infographics.deleteMany({
                where: {
                    id: {
                        gt: 0,
                    }
                }
            });
            if (!deletedInphographicsCount) {
                throw new Error(`Инфографики не найдено`);
            }
            return deletedInphographicsCount;
        }
        catch (error) {
            console.error(`Ошибка при удалении инфографики:`, error);
        }
    }
};
exports.InphographicsService = InphographicsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], InphographicsService);
//# sourceMappingURL=inphographics.service.js.map