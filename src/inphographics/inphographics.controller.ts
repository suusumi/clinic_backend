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
import { InphographicsService } from './inphographics.service';
import { CreateInphographicDto } from './dto/create-inphographic.dto';
import { UpdateInphographicDto } from './dto/update-inphographic.dto';

@Controller('inphographics')
export class InphographicsController {
  constructor(private readonly inphographicsService: InphographicsService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createInphographicDto: CreateInphographicDto) {
    return await this.inphographicsService.create(createInphographicDto);
  }

  @Get()
  async findAll() {
    return await this.inphographicsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.inphographicsService.findOne(+id);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateInphographicDto: UpdateInphographicDto) {
    return await this.inphographicsService.update(+id, updateInphographicDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.inphographicsService.remove(+id);
  }

  @Delete()
  async removeAll() {
    return await this.inphographicsService.removeAll();
  }
}
