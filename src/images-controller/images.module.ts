import { Module } from '@nestjs/common';
import { ImagesControllerController } from './images-controller.controller';
import {DatabaseModule} from "../database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [ImagesControllerController]
})
export class ImagesModule {}