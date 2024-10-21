import { Test, TestingModule } from '@nestjs/testing';
import { InphographicsService } from './inphographics.service';

describe('InphographicsService', () => {
  let service: InphographicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InphographicsService],
    }).compile();

    service = module.get<InphographicsService>(InphographicsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
