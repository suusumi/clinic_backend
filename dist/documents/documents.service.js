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
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const fs = require("fs");
let DocumentsService = exports.DocumentsService = class DocumentsService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async create(createDocumentDto) {
        try {
            return await this.databaseService.documents.create({
                data: createDocumentDto,
            });
        }
        catch (error) {
            console.error('Ошибка при создании сущности-документа:', error);
        }
    }
    async findAll() {
        try {
            return await this.databaseService.documents.findMany();
        }
        catch (error) {
            console.error('Ошибка при получении списка cущностей-документов:', error);
        }
    }
    async findOne(id) {
        try {
            const document = await this.databaseService.documents.findUnique({
                where: { id },
            });
            if (!document) {
                throw new Error(`Сущность-документ с ID ${id} не найден`);
            }
            return document;
        }
        catch (error) {
            console.error(`Ошибка при поиске сущности-документа с ID ${id}:`, error);
        }
    }
    async update(id, updateDocumentDto) {
        try {
            const updatedDocument = await this.databaseService.documents.update({
                where: { id },
                data: updateDocumentDto,
            });
            if (!updatedDocument) {
                throw new Error(`Сущность-документ с ID ${id} не найден`);
            }
            return updatedDocument;
        }
        catch (error) {
            console.error(`Ошибка при обновлении сущности-документа с ID ${id}:`, error);
        }
    }
    async updateFile(id, fileName) {
        try {
            const updateDocumentDto = {};
            updateDocumentDto.file_name = fileName;
            const document = await this.databaseService.documents.findUnique({
                where: { id },
            });
            try {
                let deletingPath = './public/uploads/docs/' + document.file_name;
                console.log(deletingPath);
                fs.unlinkSync(deletingPath);
                console.log('Старый файл документа перед апдейтом файла документа успешно удален: ./public/uploads/docs/', document.file_name);
            }
            catch (err) {
                console.error('Ошибка при удалении файла:', err);
            }
            const updatedDocument = await this.databaseService.documents.update({
                where: { id },
                data: updateDocumentDto,
            });
            if (!updatedDocument) {
                throw new Error(`Сущность документа с ID ${id} не найдена`);
            }
            return updatedDocument;
        }
        catch (error) {
            console.error(`Ошибка при обновлении файла для сущности документа с ID ${id}:`, error);
        }
    }
    async remove(id) {
        try {
            const deletedDocument = await this.databaseService.documents.delete({
                where: {
                    id: id,
                },
            });
            if (!deletedDocument) {
                throw new Error(`Сущность документа с ID ${id} не найдена`);
            }
            try {
                fs.unlinkSync('./public/uploads/docs/' + deletedDocument.file_name);
                console.log('Файл документа  при удалении сущности-документа успешно удален: ./public/uploads/docs/', deletedDocument.file_name);
            }
            catch (err) {
                console.error('Ошибка при удалении файла-документа:', err);
            }
            return deletedDocument;
        }
        catch (error) {
            console.error(`Ошибка при удалении сущности-документа и его файла с ID ${id}:`, error);
        }
    }
};
exports.DocumentsService = DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], DocumentsService);
//# sourceMappingURL=documents.service.js.map