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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let CategoriesService = exports.CategoriesService = class CategoriesService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async create(createCategoryDto) {
        try {
            return await this.databaseService.categories.create({
                data: createCategoryDto,
            });
        }
        catch (error) {
            throw new common_1.HttpException(`Ошибка при созданиии категории` + error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        try {
            return await this.databaseService.categories.findMany();
        }
        catch (error) {
            throw new common_1.HttpException(`Ошибка при получения списка категорий с БД:` + error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const category = await this.databaseService.categories.findUnique({
                where: { id },
            });
            if (!category) {
                throw new Error(`Категория с ID ${id} не найдена`);
            }
            return category;
        }
        catch (error) {
            throw new common_1.HttpException(`Ошибка при поиске категории с ID ${id}:` + error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateCategoryDto) {
        try {
            const updatedCategory = await this.databaseService.categories.update({
                where: { id },
                data: updateCategoryDto,
            });
            if (!updatedCategory) {
                throw new Error(`Категория с ID ${id} не найдена`);
            }
            return updatedCategory;
        }
        catch (error) {
            throw new common_1.HttpException(`Ошибка при обновлении категории с ID ${id}:` + error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const deletedCategory = await this.databaseService.categories.delete({
                where: {
                    id: id
                }
            });
            if (!deletedCategory) {
                throw new Error(`Категория с ID ${id} не найдена`);
            }
            return deletedCategory;
        }
        catch (error) {
            throw new common_1.HttpException(`Ошибка при удалении категории с ID ${id}:` + error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map