import { Injectable } from '@nestjs/common';
import { CreateSpecialistDto } from './dto/create-specialist.dto';
import { UpdateSpecialistDto } from './dto/update-specialist.dto';
import { DatabaseService } from '../database/database.service';
import * as fs from 'fs';

@Injectable()
export class SpecialistsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createSpecialistDto: CreateSpecialistDto) {
    try {
      return await this.databaseService.specialists.create({
        data: createSpecialistDto,
      }); // Возврат созданного
    } catch (error) {
      console.error('Ошибка при создании специалиста:', error);
    }
  }

  async findAll() {
    try {
      return await this.databaseService.specialists.findMany();
    } catch (error) {
      console.error('Ошибка при получении списка специалистов:', error);
    }
  }

  async findOne(id: number) {
    try {
      const specialist = await this.databaseService.specialists.findUnique({
        where: { id },
      });

      if (!specialist) {
        throw new Error(`Специалист с ID ${id} не найден`);
      }

      return specialist;
    } catch (error) {
      console.error(`Ошибка при поиске специалиста с ID ${id}:`, error);
    }
  }

  async update(id: number, updateSpecialistDto: UpdateSpecialistDto) {
    try {
      const updatedSpecialist = await this.databaseService.specialists.update({
        where: { id },
        data: updateSpecialistDto,
      });

      if (!updatedSpecialist) {
        throw new Error(`Специалист с ID ${id} не найден`);
      }

      return updatedSpecialist;
    } catch (error) {
      console.error(`Ошибка при обновлении специалиста с ID ${id}:`, error);
    }
  }

  async updatePhoto(id: number, photoPath: string) {
    try {
      const updateSpecialistDto: UpdateSpecialistDto = {};
      updateSpecialistDto.photo_path = photoPath;

      const specialist = await this.databaseService.specialists.findUnique({
        where: { id },
      });

      try {
        // Удаление старой фотки
        fs.unlinkSync('./public/uploads/' + specialist.photo_path);
        console.log(
          'Старое фото перед апдейтом фото специалиста успешно удалено: ./public/uploads/',
          specialist.photo_path,
        );
      } catch (err) {
        console.error('Ошибка при удалении файла:', err);
      }

      const updatedSpecialist = await this.databaseService.specialists.update({
        where: { id },
        data: updateSpecialistDto,
      });

      if (!updatedSpecialist) {
        throw new Error(`Специалист с ID ${id} не найден`);
      }

      return updatedSpecialist;
    } catch (error) {
      console.error(
        `Ошибка при обновлении фотографии специалиста с ID ${id}:`,
        error,
      );
    }
  }

  async remove(id: number) {
    try {
      const deletedSpecialist = await this.databaseService.specialists.delete({
        where: {
          id: id,
        },
      });

      if (!deletedSpecialist) {
        throw new Error(`Специалист с ID ${id} не найден`);
      }

      try {
        // Удаление файла
        fs.unlinkSync('./public/uploads/' + deletedSpecialist.photo_path);
        console.log(
          'Файл с фото специалиста при удалении специалиста успешно удален: ./public/uploads/',
          deletedSpecialist.photo_path,
        );
      } catch (err) {
        console.error('Ошибка при удалении файла:', err);
      }

      return deletedSpecialist;
    } catch (error) {
      console.error(`Ошибка при удалении специалиста с ID ${id}:`, error);
    }
  }
}
