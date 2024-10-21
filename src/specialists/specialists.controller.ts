import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SpecialistsService } from './specialists.service';
import { CreateSpecialistDto } from './dto/create-specialist.dto';
import { UpdateSpecialistDto } from './dto/update-specialist.dto';

@Controller('specialists')
export class SpecialistsController {
  constructor(private readonly specialistsService: SpecialistsService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createSpecialistDto: CreateSpecialistDto) {
    return await this.specialistsService.create(createSpecialistDto);
  }
  @Get()
  async findAll() {
    return await this.specialistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.specialistsService.findOne(+id);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSpecialistDto: UpdateSpecialistDto,
  ) {
    return await this.specialistsService.update(+id, updateSpecialistDto);
  }

  @Patch('updatephoto/:id')
  @UseInterceptors(
    FileInterceptor('photo', {
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
  async updatePhoto(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      return await this.specialistsService.updatePhoto(+id, file.filename);
    } else {
      console.log('Всё сломалось при обновлении фото специалиста на сервере');
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.specialistsService.remove(+id);
  }

  @Post('createwithphoto')
  @UseInterceptors(
    FileInterceptor('photo', {
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
  async createSpecialistWithImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() bodyData: CreateSpecialistDto,
  ) {
    // Внимание, костыли!
    // Преобразую то, что пришло, в строку
    const jsonString = JSON.stringify(bodyData);
    // Преобразую в JSON пришедшую строку
    const parsedObject = JSON.parse(jsonString);
    // Получаю строку с данными из объекта json
    const bodyDataString = parsedObject.bodyData;
    // Создаю DTO на основе строки с данными из объекта json
    const createSpecialistDto: CreateSpecialistDto = JSON.parse(bodyDataString);
    // Заменяю свойство photo_path на файл, который upload-им
    if (file) {
      createSpecialistDto.photo_path = file.filename;
      return await this.specialistsService.create(createSpecialistDto);
    } else {
      console.log('Всё сломалось при загрузке фото специалиста на сервер');
    }
  }
}
