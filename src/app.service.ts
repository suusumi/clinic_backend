import { Injectable } from '@nestjs/common';
import { PrismaClient, Specialists } from '@prisma/client'
import {DatabaseService} from "./database/database.service";

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) {
  }

  async getHello(){
    const res = await this.databaseService.specialists.count();
    return 'Specialists number ' + res;
  }
}
