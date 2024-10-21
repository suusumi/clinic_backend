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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const bcrypt = require("bcrypt");
let AdminService = exports.AdminService = class AdminService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async create(createAdminDto) {
        try {
            const passwordToHash = createAdminDto.password_hash;
            const saltRounds = 10;
            createAdminDto.password_hash = await bcrypt.hash(passwordToHash, saltRounds);
            return await this.databaseService.administrators.create({
                data: createAdminDto,
            });
        }
        catch (error) {
            throw new common_1.HttpException('Ошибка при регистрации администратора:' + error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async authAsAdmin(authAdminDto) {
        try {
            const login = authAdminDto.login;
            const admin = await this.databaseService.administrators.findUnique({
                where: { login },
            });
            if (!admin) {
                throw new Error(`Сущность администратора не найдена`);
            }
            const hashedPassword = admin.password_hash;
            const isPasswordValid = await bcrypt.compare(authAdminDto.password, hashedPassword);
            if (admin && isPasswordValid) {
                return admin;
            }
            else {
                throw new Error(`Неправильный логин или пароль`);
            }
        }
        catch (error) {
            throw new common_1.HttpException('Ошибка при аутентификации администратора:' + error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        try {
            return await this.databaseService.administrators.findMany();
        }
        catch (error) {
            console.error('Ошибка при получении списка администраторов:', error);
        }
    }
    async findOne(id) {
        try {
            const administrator = await this.databaseService.administrators.findUnique({
                where: { id },
            });
            if (!administrator) {
                throw new Error(`Сущность администратора с ID ${id} не найдена`);
            }
            return administrator;
        }
        catch (error) {
            console.error(`Ошибка при поиске сущности администратора с ID ${id}:`, error);
        }
    }
    async update(id, updateAdminDto) {
        try {
            const updatedAdministrator = await this.databaseService.administrators.update({
                where: { id },
                data: updateAdminDto,
            });
            if (!updatedAdministrator) {
                throw new Error(`Сущность администратора с ID ${id} не найдена`);
            }
            return updatedAdministrator;
        }
        catch (error) {
            console.error(`Ошибка при обновлении сущности администратора с ID ${id}:`, error);
        }
    }
    async remove(id) {
        try {
            const deletedAdministrator = await this.databaseService.administrators.delete({
                where: {
                    id: id
                }
            });
            if (!deletedAdministrator) {
                throw new Error(`Сущность администратора с ID ${id} не найдена`);
            }
            return deletedAdministrator;
        }
        catch (error) {
            console.error(`Ошибка при удалении сущности администратора с ID ${id}:`, error);
        }
    }
};
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], AdminService);
//# sourceMappingURL=admin.service.js.map