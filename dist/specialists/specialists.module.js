"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialistsModule = void 0;
const common_1 = require("@nestjs/common");
const specialists_service_1 = require("./specialists.service");
const specialists_controller_1 = require("./specialists.controller");
const database_module_1 = require("../database/database.module");
let SpecialistsModule = exports.SpecialistsModule = class SpecialistsModule {
};
exports.SpecialistsModule = SpecialistsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [specialists_controller_1.SpecialistsController],
        providers: [specialists_service_1.SpecialistsService],
    })
], SpecialistsModule);
//# sourceMappingURL=specialists.module.js.map