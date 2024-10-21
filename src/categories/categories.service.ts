import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {DatabaseService} from "../database/database.service";

@Injectable()
export class CategoriesService {

  constructor(private readonly databaseService: DatabaseService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.databaseService.categories.create({
        data: createCategoryDto,
      }); // Возврат созданного
    } catch (error) {
      throw new HttpException(`Ошибка при созданиии категории` + error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      return await this.databaseService.categories.findMany();
    } catch (error) {
      throw new HttpException(`Ошибка при получения списка категорий с БД:` + error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.databaseService.categories.findUnique({
        where: { id },
      });

      if (!category) {
        throw new Error(`Категория с ID ${id} не найдена`);
      }

      return category;
    } catch (error) {
      throw new HttpException(`Ошибка при поиске категории с ID ${id}:` + error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const updatedCategory = await this.databaseService.categories.update({
        where: { id },
        data: updateCategoryDto,
      });

      if (!updatedCategory) {
        throw new Error(`Категория с ID ${id} не найдена`);
      }

      return updatedCategory;
    } catch (error) {
      throw new HttpException(`Ошибка при обновлении категории с ID ${id}:` + error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      const deletedCategory = await this.databaseService.categories.delete({
        where: {
          id: id
        }
      });

      if (!deletedCategory) {
        throw new Error(`Категория с ID ${id} не найдена`);
      }

      return deletedCategory;
    } catch (error) {
      throw new HttpException(`Ошибка при удалении категории с ID ${id}:` + error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
