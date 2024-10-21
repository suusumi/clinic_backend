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
  ParseIntPipe
} from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return await this.subcategoriesService.create(createSubcategoryDto);
  }

  @Get()
  async findAll() {
    return await this.subcategoriesService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.subcategoriesService.findOne(id);
  }

  @UsePipes(new ValidationPipe())
  @Get('getbycategory/:category_id')
  async findSubCategoriesByCategory(@Param('category_id', ParseIntPipe) category_id: number) {
    return await this.subcategoriesService.findSubCategoriesByCategory(category_id);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateSubcategoryDto: UpdateSubcategoryDto) {
    return await this.subcategoriesService.update(id, updateSubcategoryDto);
  }


  @UsePipes(new ValidationPipe())
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.subcategoriesService.remove(id);
  }
}
