import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import {DatabaseService} from "../database/database.service";

@Injectable()
export class ContactsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createContactDto: CreateContactDto) {
    try {
      return await this.databaseService.contacts.create({
        data: createContactDto,
      });
    } catch (error) {
      console.error('Ошибка при создании контактов:', error);
    }
  }

  async findAll() {
    try {
      return await this.databaseService.contacts.findMany();
    } catch (error) {
      console.error('Ошибка при получении списка сущностей-контактов:', error);
    }
  }

  async findOne(id: number) {
    try {
      const contact = await this.databaseService.contacts.findUnique({
        where: { id },
      });

      if (!contact) {
        throw new Error(`Сущность контакта с ID ${id} не найден`);
      }

      return contact;
    } catch (error) {
      console.error(`Ошибка при поиске сущности контакта с ID ${id}:`, error);
    }
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    try {
      const updatedContact = await this.databaseService.contacts.update({
        where: { id },
        data: updateContactDto,
      });

      if (!updatedContact) {
        throw new Error(`Сущность контакта с ID ${id} не найдена`);
      }

      return updatedContact;
    } catch (error) {
      console.error(`Ошибка при обновлении сущности контакта с ID ${id}:`, error);
    }
  }

  async remove(id: number) {
    try {
      const deletedContacts = await this.databaseService.contacts.delete({
        where: {
          id: id
        }
      });

      if (!deletedContacts) {
        throw new Error(`Сущность контакта с ID ${id} не найдена`);
      }

      return deletedContacts;
    } catch (error) {
      console.error(`Ошибка при удалении сущности контакта с ID ${id}:`, error);
    }
  }
}
