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
exports.ContactsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let ContactsService = exports.ContactsService = class ContactsService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async create(createContactDto) {
        try {
            return await this.databaseService.contacts.create({
                data: createContactDto,
            });
        }
        catch (error) {
            console.error('Ошибка при создании контактов:', error);
        }
    }
    async findAll() {
        try {
            return await this.databaseService.contacts.findMany();
        }
        catch (error) {
            console.error('Ошибка при получении списка сущностей-контактов:', error);
        }
    }
    async findOne(id) {
        try {
            const contact = await this.databaseService.contacts.findUnique({
                where: { id },
            });
            if (!contact) {
                throw new Error(`Сущность контакта с ID ${id} не найден`);
            }
            return contact;
        }
        catch (error) {
            console.error(`Ошибка при поиске сущности контакта с ID ${id}:`, error);
        }
    }
    async update(id, updateContactDto) {
        try {
            const updatedContact = await this.databaseService.contacts.update({
                where: { id },
                data: updateContactDto,
            });
            if (!updatedContact) {
                throw new Error(`Сущность контакта с ID ${id} не найдена`);
            }
            return updatedContact;
        }
        catch (error) {
            console.error(`Ошибка при обновлении сущности контакта с ID ${id}:`, error);
        }
    }
    async remove(id) {
        try {
            const deletedContacts = await this.databaseService.contacts.delete({
                where: {
                    id: id
                }
            });
            if (!deletedContacts) {
                throw new Error(`Сущность контакта с ID ${id} не найдена`);
            }
            return deletedContacts;
        }
        catch (error) {
            console.error(`Ошибка при удалении сущности контакта с ID ${id}:`, error);
        }
    }
};
exports.ContactsService = ContactsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ContactsService);
//# sourceMappingURL=contacts.service.js.map