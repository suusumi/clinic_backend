import {
    Controller,
    Get,
    Patch,
    Body,
    UsePipes,
    ValidationPipe,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { UpdateAboutUsDto } from './dto/update-about-us.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('about-us')
export class AboutUsController {
    constructor(private readonly aboutUsService: AboutUsService) {}

    @Get()
    async getAboutUs() {
        return await this.aboutUsService.getAboutUs();
    }

    @UsePipes(new ValidationPipe())
    @Patch()
    async update(@Body() updateAboutUsDto: UpdateAboutUsDto) {
        return await this.aboutUsService.update(updateAboutUsDto);
    }

    @Patch('updateimage')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './public/uploads', // Путь к папке для сохранения изображений
                filename: (req, file, cb) => {
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');
                    return cb(null, `${randomName}${extname(file.originalname)}`);
                },
            }),
        }),
    )
    async updateImage(@UploadedFile() file: Express.Multer.File) {
        if (file) {
            return await this.aboutUsService.updateImage(file.filename);
        } else {
            console.error('Ошибка при обновлении изображения для раздела О НАС');
        }
    }
}
