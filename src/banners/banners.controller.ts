import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createBannerDto: CreateBannerDto) {
    return await this.bannersService.create(createBannerDto);
  }

  @Get()
  async findAll() {
    return await this.bannersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.bannersService.findOne(+id);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBannerDto: UpdateBannerDto,
  ) {
    return await this.bannersService.update(+id, updateBannerDto);
  }

  @Patch('updateimage/:id')
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
  async updateImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      return await this.bannersService.updateImage(+id, file.filename);
    } else {
      console.log(
        'Всё сломалось при обновлении изображения баннера на сервере',
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.bannersService.remove(+id);
  }

  @Post('createwithimage')
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

  //@UsePipes(new ValidationPipe())
  async createBannerWithImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() bodyData: CreateBannerDto,
  ) {
    // Внимание, костыли!
    // Преобразую то, что пришло, в строку
    const jsonString = JSON.stringify(bodyData);
    // Преобразую в JSON пришедшую строку
    const parsedObject = JSON.parse(jsonString);
    // Получаю строку с данными из объекта json
    const bodyDataString = parsedObject.bodyData;
    // Создаю DTO на основе строки с данными из объекта json
    const createBannerDto: CreateBannerDto = JSON.parse(bodyDataString);
    // Заменяю свойство photo_path на файл, который upload-им
    if (file) {
      createBannerDto.img_path = file.filename;
      return await this.bannersService.create(createBannerDto);
    } else {
      console.log('Всё сломалось при загрузке изображения баннера на сервер');
    }
  }
}
