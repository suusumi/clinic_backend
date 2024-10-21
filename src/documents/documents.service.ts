import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { DatabaseService } from '../database/database.service';
import * as fs from 'fs';

@Injectable()
export class DocumentsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createDocumentDto: CreateDocumentDto) {
    try {
      return await this.databaseService.documents.create({
        data: createDocumentDto,
      });
    } catch (error) {
      console.error('Ошибка при создании сущности-документа:', error);
    }
  }

  async findAll() {
    try {
      return await this.databaseService.documents.findMany();
    } catch (error) {
      console.error('Ошибка при получении списка cущностей-документов:', error);
    }
  }

  async findOne(id: number) {
    try {
      const document = await this.databaseService.documents.findUnique({
        where: { id },
      });

      if (!document) {
        throw new Error(`Сущность-документ с ID ${id} не найден`);
      }

      return document;
    } catch (error) {
      console.error(`Ошибка при поиске сущности-документа с ID ${id}:`, error);
    }
  }

  async update(id: number, updateDocumentDto: UpdateDocumentDto) {
    try {
      const updatedDocument = await this.databaseService.documents.update({
        where: { id },
        data: updateDocumentDto,
      });

      if (!updatedDocument) {
        throw new Error(`Сущность-документ с ID ${id} не найден`);
      }

      return updatedDocument;
    } catch (error) {
      console.error(`Ошибка при обновлении сущности-документа с ID ${id}:`, error);
    }
  }

  async updateFile(id: number, fileName: string) {
    try {
      const updateDocumentDto: UpdateDocumentDto = {};
      updateDocumentDto.file_name = fileName;

      const document = await this.databaseService.documents.findUnique({
        where: { id },
      });

      try {
        // Удаление старого изображения
        let deletingPath: string = './public/uploads/docs/' + document.file_name;
        console.log(deletingPath);
        fs.unlinkSync(deletingPath);
        console.log(
            'Старый файл документа перед апдейтом файла документа успешно удален: ./public/uploads/docs/',
            document.file_name,
        );
      } catch (err) {
        console.error('Ошибка при удалении файла:', err);
      }

      const updatedDocument = await this.databaseService.documents.update({
        where: { id },
        data: updateDocumentDto,
      });

      if (!updatedDocument) {
        throw new Error(`Сущность документа с ID ${id} не найдена`);
      }

      return updatedDocument;
    } catch (error) {
      console.error(
          `Ошибка при обновлении файла для сущности документа с ID ${id}:`,
          error,
      );
    }
  }

  async remove(id: number) {
    try {
      const deletedDocument = await this.databaseService.documents.delete({
        where: {
          id: id,
        },
      });

      if (!deletedDocument) {
        throw new Error(`Сущность документа с ID ${id} не найдена`);
      }

      try {
        // Удаление файла
        fs.unlinkSync('./public/uploads/docs/' + deletedDocument.file_name);
        console.log(
            'Файл документа  при удалении сущности-документа успешно удален: ./public/uploads/docs/',
            deletedDocument.file_name,
        );
      } catch (err) {
        console.error('Ошибка при удалении файла-документа:', err);
      }

      return deletedDocument;
    } catch (error) {
      console.error(`Ошибка при удалении сущности-документа и его файла с ID ${id}:`, error);
    }
  }
}
