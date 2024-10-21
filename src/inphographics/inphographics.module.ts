import { Module } from '@nestjs/common';
import { InphographicsService } from './inphographics.service';
import { InphographicsController } from './inphographics.controller';
import {DatabaseModule} from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [InphographicsController],
  providers: [InphographicsService],
})
export class InphographicsModule {}
