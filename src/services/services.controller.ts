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
  ParseIntPipe, ParseEnumPipe
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    return await this.servicesService.create(createServiceDto);
  }

  @Get()
  async findAll() {
    return await this.servicesService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.servicesService.findOne(id);
  }

  @UsePipes(new ValidationPipe())
  @Get('getbysubcategory/:sub_category_id')
  async findServicesBySubCategory(@Param('sub_category_id', ParseIntPipe) sub_category_id: number) {
    return await this.servicesService.findServicesBySubCategory(sub_category_id);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateServiceDto: UpdateServiceDto) {
    return await this.servicesService.update(id, updateServiceDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.servicesService.remove(id);
  }
}
