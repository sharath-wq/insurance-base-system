import { Test, TestingModule } from '@nestjs/testing';
import { CoverageController } from './coverage.controller';
import { CoverageService } from 'src/core/services/coverage.service';
import { Coverable } from 'src/core/entities/coverable.entity';
import { CovTerm } from 'src/core/entities/cov-term.entity';

describe('CoverageController', () => {
  let controller: CoverageController;
  let service: CoverageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoverageController],
      providers: [
        {
          provide: CoverageService,
          useValue: {
            createCoverable: jest.fn(),
            createCoverage: jest.fn(),
            createCovTerm: jest.fn(),
            findCoveragesByQuote: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CoverageController>(CoverageController);
    service = module.get<CoverageService>(CoverageService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createCoverable', () => {
    it('should call the coverage service to create a coverable', async () => {
      const coverableData: Partial<Coverable> = {};
      await controller.createCoverable(coverableData);
      expect(service.createCoverable).toHaveBeenCalledWith(coverableData);
    });
  });

  describe('createCovTerm', () => {
    it('should call the coverage service to create a cov-term', async () => {
      const covTermData: Partial<CovTerm> = {};
      await controller.createCovTerm(covTermData);
      expect(service.createCovTerm).toHaveBeenCalledWith(covTermData);
    });
  });

  describe('findCoveragesByQuote', () => {
    it('should call the coverage service to find coverages by quote', async () => {
      const quoteId = 1;
      await controller.findCoveragesByQuote(quoteId);
      expect(service.findCoveragesByQuote).toHaveBeenCalledWith(quoteId);
    });
  });
});
