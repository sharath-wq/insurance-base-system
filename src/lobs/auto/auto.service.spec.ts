import { Test, TestingModule } from '@nestjs/testing';
import { AutoService } from './auto.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Vehicle } from './entites/vehicle.entity';
import { PolicyService } from 'src/core/services/policy.service';
import { QuoteService } from 'src/core/services/quote.service';

describe('AutoService', () => {
  let service: AutoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AutoService,
        {
          provide: getRepositoryToken(Vehicle),
          useValue: {},
        },
        {
          provide: PolicyService,
          useValue: {},
        },
        {
          provide: QuoteService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AutoService>(AutoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
