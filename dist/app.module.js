"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_module_1 = require("./database/database.module");
const specialists_module_1 = require("./specialists/specialists.module");
const banners_module_1 = require("./banners/banners.module");
const inphographics_module_1 = require("./inphographics/inphographics.module");
const images_controller_controller_1 = require("./images-controller/images-controller.controller");
const admin_module_1 = require("./admin/admin.module");
const documents_module_1 = require("./documents/documents.module");
const contacts_module_1 = require("./contacts/contacts.module");
const services_module_1 = require("./services/services.module");
const categories_module_1 = require("./categories/categories.module");
const subcategories_module_1 = require("./subcategories/subcategories.module");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, specialists_module_1.SpecialistsModule, banners_module_1.BannersModule, inphographics_module_1.InphographicsModule, admin_module_1.AdminModule, documents_module_1.DocumentsModule, contacts_module_1.ContactsModule, services_module_1.ServicesModule, categories_module_1.CategoriesModule, subcategories_module_1.SubcategoriesModule],
        controllers: [app_controller_1.AppController, images_controller_controller_1.ImagesControllerController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map