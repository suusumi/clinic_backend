import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import {DatabaseService} from "../database/database.service";

@Injectable()
export class SubcategoriesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createSubcategoryDto: CreateSubcategoryDto) {
    try {
      return await this.databaseService.subCategories.create({
        data: createSubcategoryDto,
      }); // Возврат созданного
    } catch (error) {
      throw new HttpException(`Ошибка при созданиии подкатегории` + error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      return await this.databaseService.subCategories.findMany();
    } catch (error) {
      throw new HttpException(`Ошибка при получения списка подкатегорий с БД:` + error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      const subcategory = await this.databaseService.subCategories.findUnique({
        where: { id },
      });

      if (!subcategory) {
        throw new Error(`Подкатегория с ID ${id} не найдена`);
      }

      return subcategory;
    } catch (error) {
      throw new HttpException(`Ошибка при поиске подкатегории с ID ${id}:` + error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findSubCategoriesByCategory(category_id: number) {
    try {
      const subcategories = await this.databaseService.subCategories.findMany({
        where: { category_id: category_id },
      });

      if (!subcategories) {
        throw new Error(`Подкатегории с категорией ${category_id} не найдены`);
      }

      return subcategories;
    } catch (error) {
      throw new HttpException(`Ошибка при поиске подкатегорий с категорией ${category_id}:` + error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateSubcategoryDto: UpdateSubcategoryDto) {
    try {
      const updatedSubCategory = await this.databaseService.subCategories.update({
        where: { id },
        data: updateSubcategoryDto,
      });

      if (!updatedSubCategory) {
        throw new Error(`Подкатегория с ID ${id} не найдена`);
      }

      return updatedSubCategory;
    } catch (error) {
      throw new HttpException(`Ошибка при обновлении подкатегории с ID ${id}:` + error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      const deletedSubCategory = await this.databaseService.subCategories.delete({
        where: {
          id: id
        }
      });

      if (!deletedSubCategory) {
        throw new Error(`Подкатегория с ID ${id} не найдена`);
      }

      return deletedSubCategory;
    } catch (error) {
      throw new HttpException(`Ошибка при удалении подкатегории с ID ${id}:` + error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
