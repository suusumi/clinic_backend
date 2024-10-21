import { Test, TestingModule } from '@nestjs/testing';
import { InphographicsController } from './inphographics.controller';
import { InphographicsService } from './inphographics.service';

describe('InphographicsController', () => {
  let controller: InphographicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InphographicsController],
      providers: [InphographicsService],
    }).compile();

    controller = module.get<InphographicsController>(InphographicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
