import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { UpdateAboutUsDto } from "./dto/update-about-us.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class AboutUsService {
    constructor(private readonly databaseService: DatabaseService) {}

    async getAboutUs() {
        try {
            return await this.databaseService.aboutUs.findUnique({
                where: { id: 1 },
            });
        } catch (error) {
            console.error('Ошибка получения информации О НАС:', error);
        }
    }

    async update(updateAboutUsDto: UpdateAboutUsDto) {
        try {
            return await this.databaseService.aboutUs.update({
                where: { id: 1 },  // Фиксируем редактирование записи с id = 1
                data: updateAboutUsDto,
            });
        } catch (error) {
            console.error('Ошибка обновления информации О НАС:', error);
        }
    }

    async updateImage(imageUrl: string) {
        try {
            return await this.databaseService.aboutUs.update({
                where: { id: 1 },
                data: { imageUrl },
            });
        } catch (error) {
            console.error('Ошибка обновления изображения О НАС:', error);
        }
    }
}