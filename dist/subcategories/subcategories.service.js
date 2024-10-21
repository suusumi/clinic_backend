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
exports.SubcategoriesService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let SubcategoriesService = exports.SubcategoriesService = class SubcategoriesService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async create(createSubcategoryDto) {
        try {
            return await this.databaseService.subCategories.create({
                data: createSubcategoryDto,
            });
        }
        catch (error) {
            throw new common_1.HttpException(`Ошибка при созданиии подкатегории` + error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        try {
            return await this.databaseService.subCategories.findMany();
        }
        catch (error) {
            throw new common_1.HttpException(`Ошибка при получения списка подкатегорий с БД:` + error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const subcategory = await this.databaseService.subCategories.findUnique({
                where: { id },
            });
            if (!subcategory) {
                throw new Error(`Подкатегория с ID ${id} не найдена`);
            }
            return subcategory;
        }
        catch (error) {
            throw new common_1.HttpException(`Ошибка при поиске подкатегории с ID ${id}:` + error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findSubCategoriesByCategory(category_id) {
        try {
            const subcategories = await this.databaseService.subCategories.findMany({
                where: { category_id: category_id },
            });
            if (!subcategories) {
                throw new Error(`Подкатегории с категорией ${category_id} не найдены`);
            }
            return subcategories;
        }
        catch (error) {
            throw new common_1.HttpException(`Ошибка при поиске подкатегорий с категорией ${category_id}:` + error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateSubcategoryDto) {
        try {
            const updatedSubCategory = await this.databaseService.subCategories.update({
                where: { id },
                data: updateSubcategoryDto,
            });
            if (!updatedSubCategory) {
                throw new Error(`Подкатегория с ID ${id} не найдена`);
            }
            return updatedSubCategory;
        }
        catch (error) {
            throw new common_1.HttpException(`Ошибка при обновлении подкатегории с ID ${id}:` + error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const deletedSubCategory = await this.databaseService.subCategories.delete({
                where: {
                    id: id
                }
            });
            if (!deletedSubCategory) {
                throw new Error(`Подкатегория с ID ${id} не найдена`);
            }
            return deletedSubCategory;
        }
        catch (error) {
            throw new common_1.HttpException(`Ошибка при удалении подкатегории с ID ${id}:` + error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.SubcategoriesService = SubcategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], SubcategoriesService);
//# sourceMappingURL=subcategories.service.js.map