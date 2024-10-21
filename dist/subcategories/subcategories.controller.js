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
exports.SubcategoriesController = void 0;
const common_1 = require("@nestjs/common");
const subcategories_service_1 = require("./subcategories.service");
const create_subcategory_dto_1 = require("./dto/create-subcategory.dto");
const update_subcategory_dto_1 = require("./dto/update-subcategory.dto");
let SubcategoriesController = exports.SubcategoriesController = class SubcategoriesController {
    constructor(subcategoriesService) {
        this.subcategoriesService = subcategoriesService;
    }
    async create(createSubcategoryDto) {
        return await this.subcategoriesService.create(createSubcategoryDto);
    }
    async findAll() {
        return await this.subcategoriesService.findAll();
    }
    async findOne(id) {
        return await this.subcategoriesService.findOne(id);
    }
    async findSubCategoriesByCategory(category_id) {
        return await this.subcategoriesService.findSubCategoriesByCategory(category_id);
    }
    async update(id, updateSubcategoryDto) {
        return await this.subcategoriesService.update(id, updateSubcategoryDto);
    }
    async remove(id) {
        return await this.subcategoriesService.remove(id);
    }
};
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_subcategory_dto_1.CreateSubcategoryDto]),
    __metadata("design:returntype", Promise)
], SubcategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubcategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SubcategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Get)('getbycategory/:category_id'),
    __param(0, (0, common_1.Param)('category_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SubcategoriesController.prototype, "findSubCategoriesByCategory", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_subcategory_dto_1.UpdateSubcategoryDto]),
    __metadata("design:returntype", Promise)
], SubcategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SubcategoriesController.prototype, "remove", null);
exports.SubcategoriesController = SubcategoriesController = __decorate([
    (0, common_1.Controller)('subcategories'),
    __metadata("design:paramtypes", [subcategories_service_1.SubcategoriesService])
], SubcategoriesController);
//# sourceMappingURL=subcategories.controller.js.map