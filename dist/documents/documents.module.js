"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsModule = void 0;
const common_1 = require("@nestjs/common");
const documents_service_1 = require("./documents.service");
const documents_controller_1 = require("./documents.controller");
const database_module_1 = require("../database/database.module");
let DocumentsModule = exports.DocumentsModule = class DocumentsModule {
};
exports.DocumentsModule = DocumentsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [documents_controller_1.DocumentsController],
        providers: [documents_service_1.DocumentsService],
    })
], DocumentsModule);
//# sourceMappingURL=documents.module.js.map