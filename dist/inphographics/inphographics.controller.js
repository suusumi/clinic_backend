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
exports.InphographicsController = void 0;
const common_1 = require("@nestjs/common");
const inphographics_service_1 = require("./inphographics.service");
const create_inphographic_dto_1 = require("./dto/create-inphographic.dto");
const update_inphographic_dto_1 = require("./dto/update-inphographic.dto");
let InphographicsController = exports.InphographicsController = class InphographicsController {
    constructor(inphographicsService) {
        this.inphographicsService = inphographicsService;
    }
    async create(createInphographicDto) {
        return await this.inphographicsService.create(createInphographicDto);
    }
    async findAll() {
        return await this.inphographicsService.findAll();
    }
    async findOne(id) {
        return await this.inphographicsService.findOne(+id);
    }
    async update(id, updateInphographicDto) {
        return await this.inphographicsService.update(+id, updateInphographicDto);
    }
    async remove(id) {
        return await this.inphographicsService.remove(+id);
    }
    async removeAll() {
        return await this.inphographicsService.removeAll();
    }
};
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_inphographic_dto_1.CreateInphographicDto]),
    __metadata("design:returntype", Promise)
], InphographicsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InphographicsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InphographicsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_inphographic_dto_1.UpdateInphographicDto]),
    __metadata("design:returntype", Promise)
], InphographicsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InphographicsController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InphographicsController.prototype, "removeAll", null);
exports.InphographicsController = InphographicsController = __decorate([
    (0, common_1.Controller)('inphographics'),
    __metadata("design:paramtypes", [inphographics_service_1.InphographicsService])
], InphographicsController);
//# sourceMappingURL=inphographics.controller.js.map