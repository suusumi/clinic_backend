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
exports.DocumentsController = void 0;
const common_1 = require("@nestjs/common");
const documents_service_1 = require("./documents.service");
const create_document_dto_1 = require("./dto/create-document.dto");
const update_document_dto_1 = require("./dto/update-document.dto");
const fs = require("fs");
const path = require("path");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let DocumentsController = exports.DocumentsController = class DocumentsController {
    constructor(documentsService) {
        this.documentsService = documentsService;
    }
    async create(createDocumentDto) {
        return await this.documentsService.create(createDocumentDto);
    }
    async createDocumentWithFile(file, bodyData) {
        const jsonString = JSON.stringify(bodyData);
        const parsedObject = JSON.parse(jsonString);
        const bodyDataString = parsedObject.bodyData;
        const createDocumentDto = JSON.parse(bodyDataString);
        if (file) {
            createDocumentDto.file_name = file.filename;
            return await this.documentsService.create(createDocumentDto);
        }
        else {
            console.log('Всё сломалось при загрузке файла документа на сервер');
        }
    }
    async findAll() {
        return await this.documentsService.findAll();
    }
    async findOne(id) {
        return await this.documentsService.findOne(+id);
    }
    async getFileById(id, res) {
        try {
            const document = await this.documentsService.findOne(+id);
            const filePath = path.join('public', 'uploads', 'docs', document.file_name);
            console.log("Пытаемся отдать на клиента файл по пути: " + filePath);
            if (!fs.existsSync(filePath)) {
                throw new common_1.NotFoundException('Document does NOT exist');
            }
            const fileExtension = path.extname(filePath).toLowerCase();
            const imageExtensions = ['.pdf', '.doc', '.docx', '.txt'];
            if (!imageExtensions.includes(fileExtension)) {
                throw new common_1.BadRequestException('Not an document');
            }
            const documentStream = fs.createReadStream(filePath);
            documentStream.on('error', (error) => {
                if (error) {
                    throw new common_1.NotFoundException('DOCUMENT NOT FOUND');
                }
                else {
                    throw error;
                }
            });
            documentStream.pipe(res);
        }
        catch (error) {
            res.status(404).send('Document not found ' + error.message);
        }
    }
    async getFileByName(file_name, res) {
        try {
            const filePath = path.join('public', 'uploads', 'docs', file_name);
            console.log("Пытаемся отдать на клиента файл по пути: " + filePath);
            if (!fs.existsSync(filePath)) {
                throw new common_1.NotFoundException('Document does NOT exist');
            }
            const fileExtension = path.extname(filePath).toLowerCase();
            const imageExtensions = ['.pdf', '.doc', '.docx', '.txt'];
            if (!imageExtensions.includes(fileExtension)) {
                throw new common_1.BadRequestException('Not an document');
            }
            const documentStream = fs.createReadStream(filePath);
            documentStream.on('error', (error) => {
                if (error) {
                    throw new common_1.NotFoundException('DOCUMENT NOT FOUND');
                }
                else {
                    throw error;
                }
            });
            documentStream.pipe(res);
        }
        catch (error) {
            res.status(404).send('Document not found ' + error.message);
        }
    }
    async update(id, updateDocumentDto) {
        return this.documentsService.update(+id, updateDocumentDto);
    }
    async updateFile(id, file) {
        if (file) {
            return await this.documentsService.updateFile(+id, file.filename);
        }
        else {
            console.log('Всё сломалось при обновлении файла документа на сервере');
        }
    }
    async remove(id) {
        return await this.documentsService.remove(+id);
    }
};
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_document_dto_1.CreateDocumentDto]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('createwithfile'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('doc', {
        storage: (0, multer_1.diskStorage)({
            destination: './public/uploads/docs',
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                return cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_document_dto_1.CreateDocumentDto]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "createDocumentWithFile", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('getfilebyid/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "getFileById", null);
__decorate([
    (0, common_1.Get)('getfilebyname/:file_name'),
    __param(0, (0, common_1.Param)('file_name')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "getFileByName", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_document_dto_1.UpdateDocumentDto]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('updatefile/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('doc', {
        storage: (0, multer_1.diskStorage)({
            destination: './public/uploads/docs',
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                return cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "updateFile", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "remove", null);
exports.DocumentsController = DocumentsController = __decorate([
    (0, common_1.Controller)('documents'),
    __metadata("design:paramtypes", [documents_service_1.DocumentsService])
], DocumentsController);
//# sourceMappingURL=documents.controller.js.map