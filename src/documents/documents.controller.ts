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
  ParseIntPipe, NotFoundException, BadRequestException, Res, UseInterceptors, UploadedFile
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import * as fs from 'fs';
import * as path from 'path';
import {Response} from "express";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import { extname } from 'path';
import {CreateBannerDto} from "../banners/dto/create-banner.dto";

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createDocumentDto: CreateDocumentDto) {
    return await this.documentsService.create(createDocumentDto);
  }

  @Post('createwithfile')
  @UseInterceptors(
      FileInterceptor('doc', {
        storage: diskStorage({
          destination: './public/uploads/docs', // Путь к папке для сохранения документов
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

  async createDocumentWithFile(
      @UploadedFile() file: Express.Multer.File,
      @Body() bodyData: CreateDocumentDto,
  ) {
    // Внимание, костыли!
    // Преобразую то, что пришло, в строку
    const jsonString = JSON.stringify(bodyData);
    // Преобразую в JSON пришедшую строку
    const parsedObject = JSON.parse(jsonString);
    // Получаю строку с данными из объекта json
    const bodyDataString = parsedObject.bodyData;
    // Создаю DTO на основе строки с данными из объекта json
    const createDocumentDto: CreateDocumentDto = JSON.parse(bodyDataString);
    // Заменяю свойство file_name на файл, который upload-им
    if (file) {
      createDocumentDto.file_name= file.filename;
      return await this.documentsService.create(createDocumentDto);
    } else {
      console.log('Всё сломалось при загрузке файла документа на сервер');
    }
  }

  @Get()
  async findAll() {
    return await this.documentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.documentsService.findOne(+id);
  }

  @Get('getfilebyid/:id')
  async getFileById(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {

    try {
      const document = await this.documentsService.findOne(+id);
      const filePath = path.join('public', 'uploads', 'docs', document.file_name);
      console.log("Пытаемся отдать на клиента файл по пути: " + filePath);
      // Проверяем существование файла по указанному пути
      if (!fs.existsSync(filePath)) {
        // Если файл не найден, отправляем ошибку 404 Not Found
        throw new NotFoundException('Document does NOT exist');
      }

      // Получаем расширение файла из имени файла
      const fileExtension = path.extname(filePath).toLowerCase();

      // Список расширений
      const imageExtensions = ['.pdf', '.doc', '.docx', '.txt'];

      // Проверяем, что расширение файла соответствует изображению
      if (!imageExtensions.includes(fileExtension)) {
        throw new BadRequestException('Not an document');
      }

      const documentStream = fs.createReadStream(filePath);

      documentStream.on('error', (error) => {
        // Обработка ошибки чтения файла
        if (error) {
          // Если файл не найден, отправляем ошибку 404 Not Found
          throw new NotFoundException('DOCUMENT NOT FOUND');
        } else {
          // В остальных случаях отправляем ошибку сервера 500 Internal Server Error
          throw error;
        }
      });

      // Отправляем файл как ответ
      documentStream.pipe(res);

    } catch (error) {
      res.status(404).send('Document not found ' + error.message);
    }
  }

  @Get('getfilebyname/:file_name')
  async getFileByName(@Param('file_name') file_name: string, @Res() res: Response) {

    try {
      const filePath = path.join('public', 'uploads', 'docs', file_name);
      console.log("Пытаемся отдать на клиента файл по пути: " + filePath);
      // Проверяем существование файла по указанному пути
      if (!fs.existsSync(filePath)) {
        // Если файл не найден, отправляем ошибку 404 Not Found
        throw new NotFoundException('Document does NOT exist');
      }

      // Получаем расширение файла из имени файла
      const fileExtension = path.extname(filePath).toLowerCase();

      // Список расширений
      const imageExtensions = ['.pdf', '.doc', '.docx', '.txt'];

      // Проверяем, что расширение файла соответствует изображению
      if (!imageExtensions.includes(fileExtension)) {
        throw new BadRequestException('Not an document');
      }

      const documentStream = fs.createReadStream(filePath);

      documentStream.on('error', (error) => {
        // Обработка ошибки чтения файла
        if (error) {
          // Если файл не найден, отправляем ошибку 404 Not Found
          throw new NotFoundException('DOCUMENT NOT FOUND');
        } else {
          // В остальных случаях отправляем ошибку сервера 500 Internal Server Error
          throw error;
        }
      });

      // Отправляем файл как ответ
      documentStream.pipe(res);

    } catch (error) {
      res.status(404).send('Document not found ' + error.message);
    }
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDocumentDto: UpdateDocumentDto) {
    return this.documentsService.update(+id, updateDocumentDto);
  }

  @Patch('updatefile/:id')
  @UseInterceptors(
      FileInterceptor('doc', {
        storage: diskStorage({
          destination: './public/uploads/docs', // Путь к папке для сохранения изображений
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
  async updateFile(
      @Param('id', ParseIntPipe) id: number,
      @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      return await this.documentsService.updateFile(+id, file.filename);
    } else {
      console.log(
          'Всё сломалось при обновлении файла документа на сервере',
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.documentsService.remove(+id);
  }
}
