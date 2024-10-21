import { Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { DatabaseService } from '../database/database.service';
import * as fs from 'fs';

@Injectable()
export class BannersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createBannerDto: CreateBannerDto) {
    try {
      return await this.databaseService.banners.create({
        data: createBannerDto,
      }); // Возврат созданного баннера
    } catch (error) {
      console.error('Ошибка при создании баннера:', error);
    }
  }

  async findAll() {
    try {
      return await this.databaseService.banners.findMany();
    } catch (error) {
      console.error('Ошибка при получении списка баннеров:', error);
    }
  }

  async findOne(id: number) {
    try {
      const banner = await this.databaseService.banners.findUnique({
        where: { id },
      });

      if (!banner) {
        throw new Error(`Баннер с ID ${id} не найден`);
      }

      return banner;
    } catch (error) {
      console.error(`Ошибка при поиске баннера с ID ${id}:`, error);
    }
  }

  async update(id: number, updateBannerDto: UpdateBannerDto) {
    try {
      const updatedBanner = await this.databaseService.banners.update({
        where: { id },
        data: updateBannerDto,
      });

      if (!updatedBanner) {
        throw new Error(`Баннер с ID ${id} не найден`);
      }

      return updatedBanner;
    } catch (error) {
      console.error(`Ошибка при обновлении баннера с ID ${id}:`, error);
    }
  }

  async updateImage(id: number, imgPath: string) {
    try {
      const updateBannerDto: UpdateBannerDto = {};
      updateBannerDto.img_path = imgPath;

      const banner = await this.databaseService.banners.findUnique({
        where: { id },
      });

      try {
        // Удаление старого изображения
        fs.unlinkSync('./public/uploads/' + banner.img_path);
        console.log(
          'Старое изображение перед апдейтом изображения баннера успешно удалено: ./public/uploads/',
          banner.img_path,
        );
      } catch (err) {
        console.error('Ошибка при удалении файла:', err);
      }

      const updatedBanner = await this.databaseService.banners.update({
        where: { id },
        data: updateBannerDto,
      });

      if (!updatedBanner) {
        throw new Error(`Баннер с ID ${id} не найден`);
      }

      return updatedBanner;
    } catch (error) {
      console.error(
        `Ошибка при обновлении пути к изображению для баннера с ID ${id}:`,
        error,
      );
    }
  }

  async remove(id: number) {
    try {
      const deletedBanner = await this.databaseService.banners.delete({
        where: {
          id: id,
        },
      });

      if (!deletedBanner) {
        throw new Error(`Баннер с ID ${id} не найден`);
      }

      try {
        // Удаление файла
        fs.unlinkSync('./public/uploads/' + deletedBanner.img_path);
        console.log(
          'Изображение баннера при удалении баннера успешно удалено: ./public/uploads/',
          deletedBanner.img_path,
        );
      } catch (err) {
        console.error('Ошибка при удалении файла:', err);
      }

      return deletedBanner;
    } catch (error) {
      console.error(`Ошибка при удалении баннера с ID ${id}:`, error);
    }
  }
}
