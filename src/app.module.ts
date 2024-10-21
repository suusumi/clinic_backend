import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { SpecialistsModule } from './specialists/specialists.module';
import { BannersModule } from './banners/banners.module';
import { InphographicsModule } from './inphographics/inphographics.module';
import { ImagesControllerController } from './images-controller/images-controller.controller';
import { AdminModule } from './admin/admin.module';
import { DocumentsModule } from './documents/documents.module';
import { ContactsModule } from './contacts/contacts.module';
import { ServicesModule } from './services/services.module';
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';

@Module({
  imports: [DatabaseModule, SpecialistsModule, BannersModule, InphographicsModule, AdminModule, DocumentsModule, ContactsModule, ServicesModule, CategoriesModule, SubcategoriesModule],
  controllers: [AppController, ImagesControllerController],
  providers: [AppService],
})
export class AppModule {}
