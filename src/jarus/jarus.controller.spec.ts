
import { Test, TestingModule } from '@nestjs/testing';
import { JarusController } from './jarus.controller';
import { AttributeService } from './services/attributes.service';
import { CoverageService } from './services/coverage.service';
import { RatingService } from './services/rating.service';

describe('JarusController', () => {
  let controller: JarusController;
  let attributeService: AttributeService;
  let coverageService: CoverageService;
  let ratingService: RatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JarusController],
      providers: [
        {
          provide: AttributeService,
          useValue: {
            getAttributesFromJarus: jest.fn(),
          },
        },
        {
          provide: CoverageService,
          useValue: {
            getCoveragesFromJarus: jest.fn(),
          },
        },
        {
          provide: RatingService,
          useValue: {
            getRatingFromJarus: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<JarusController>(JarusController);
    attributeService = module.get<AttributeService>(AttributeService);
    coverageService = module.get<CoverageService>(CoverageService);
    ratingService = module.get<RatingService>(RatingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAttributes', () => {
    it('should call the attribute service', async () => {
      const query = { objectName: 'test', objectType: 'test', lob: 'test' };
      await controller.getAttributes(query.objectName, query.objectType, query.lob);
      expect(attributeService.getAttributesFromJarus).toHaveBeenCalledWith(query);
    });
  });

  describe('getCoverages', () => {
    it('should call the coverage service', async () => {
      const query = { objectName: 'test', objectType: 'test', lob: 'test' };
      await controller.getCoverages(query.objectName, query.objectType, query.lob);
      expect(coverageService.getCoveragesFromJarus).toHaveBeenCalledWith(query);
    });
  });

  describe('getRating', () => {
    it('should call the rating service', async () => {
      const query = { quote_id: 'test' };
      await controller.getRating(query.quote_id);
      expect(ratingService.getRatingFromJarus).toHaveBeenCalledWith(query);
    });
  });
});
