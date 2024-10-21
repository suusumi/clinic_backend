import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AuthAdminDto } from './dto/auth-admin.dto';
import {DatabaseService} from "../database/database.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {

  constructor(private readonly databaseService: DatabaseService) {}

  async create(createAdminDto: CreateAdminDto) {
    try {
      const passwordToHash = createAdminDto.password_hash;
      const saltRounds = 10;
      createAdminDto.password_hash = await bcrypt.hash(passwordToHash, saltRounds);
      return await this.databaseService.administrators.create({
        data: createAdminDto,
      });
    } catch (error) {
      throw new HttpException('Ошибка при регистрации администратора:' + error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async authAsAdmin(authAdminDto: AuthAdminDto) {
    try {
      const login = authAdminDto.login;
      const admin = await this.databaseService.administrators.findUnique({
        where: { login },
      });

      if (!admin) {
        throw new Error(`Сущность администратора не найдена`);
      }

      const hashedPassword = admin.password_hash;
      const isPasswordValid = await bcrypt.compare(authAdminDto.password, hashedPassword);

      if (admin && isPasswordValid) {
        return admin;
      } else {
        throw new Error(`Неправильный логин или пароль`);
      }
    } catch (error) {
      throw new HttpException('Ошибка при аутентификации администратора:' + error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      return await this.databaseService.administrators.findMany();
    } catch (error) {
      console.error('Ошибка при получении списка администраторов:', error);
    }
  }

  async findOne(id: number) {
    try {
      const administrator = await this.databaseService.administrators.findUnique({
        where: { id },
      });

      if (!administrator) {
        throw new Error(`Сущность администратора с ID ${id} не найдена`);
      }

      return administrator;
    } catch (error) {
      console.error(`Ошибка при поиске сущности администратора с ID ${id}:`, error);
    }
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    try {
      const updatedAdministrator = await this.databaseService.administrators.update({
        where: { id },
        data: updateAdminDto,
      });

      if (!updatedAdministrator) {
        throw new Error(`Сущность администратора с ID ${id} не найдена`);
      }

      return updatedAdministrator;
    } catch (error) {
      console.error(`Ошибка при обновлении сущности администратора с ID ${id}:`, error);
    }
  }

  async remove(id: number) {
    try {
      const deletedAdministrator = await this.databaseService.administrators.delete({
        where: {
          id: id
        }
      });

      if (!deletedAdministrator) {
        throw new Error(`Сущность администратора с ID ${id} не найдена`);
      }

      return deletedAdministrator;
    } catch (error) {
      console.error(`Ошибка при удалении сущности администратора с ID ${id}:`, error);
    }
  }
}
