import {
    Controller,
    Get,
    Res,
    NotFoundException,
    BadRequestException,
    Param
} from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('images')
export class ImagesControllerController {

    @Get(':img_path')
    async getImage(@Param('img_path') img_path: string, @Res() res: Response) {
        //console.log("Пытаемся отдать на клиента файл по пути: " + img_path);
        try {
            const filePath = path.join('public', 'uploads', img_path);
            console.log("Пытаемся отдать на клиента файл по пути: " + filePath);
            // Проверяем существование файла по указанному пути
            if (!fs.existsSync(filePath)) {
                // Если файл не найден, отправляем ошибку 404 Not Found
                throw new NotFoundException('Image does NOT exist');
            }

            // Получаем расширение файла из имени файла
            const fileExtension = path.extname(filePath).toLowerCase();

            // Список расширений изображений, которые мы считаем за изображения
            const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];

            // Проверяем, что расширение файла соответствует изображению
            if (!imageExtensions.includes(fileExtension)) {
                // Если это не изображение, отправляем ошибку 400 Bad Request
                throw new BadRequestException('Not an image');
            }

            // Читаем изображение из файла и отправляем его как ответ
            const imageStream = fs.createReadStream(filePath);

            imageStream.on('error', (error) => {
                // Обработка ошибки чтения файла
                if (error) {
                    // Если файл не найден, отправляем ошибку 404 Not Found
                    throw new NotFoundException('Image not found');
                } else {
                    // В остальных случаях отправляем ошибку сервера 500 Internal Server Error
                    throw error;
                }
            });

            // Отправляем файл как ответ
            imageStream.pipe(res);

        } catch (error) {
            res.status(404).send('Image not found ' + error.message);
        }
    }
}
