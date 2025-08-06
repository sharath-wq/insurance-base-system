
import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from '../services/health.service';
import { QuoteService } from 'src/core/services/quote.service';
import { PersonService } from '../services/person.service';
import { CoverageService } from 'src/core/services/coverage.service';
import { CreatePersonDto } from '../dtos/create-person.dto';
import { CreateQuoteDto } from 'src/core/dtos/create-quote.dto';

describe('HealthController', () => {
  let controller: HealthController;
  let healthService: HealthService;
  let quoteService: QuoteService;
  let personService: PersonService;
  let coverageService: CoverageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useValue: {
            createHealthPolicy: jest.fn(),
            createHealthQuote: jest.fn(),
            createCoveragesForQuote: jest.fn(),
          },
        },
        {
          provide: QuoteService,
          useValue: {
            getQuote: jest.fn(),
          },
        },
        {
          provide: PersonService,
          useValue: {
            updatePersons: jest.fn(),
            findAllByQuoteId: jest.fn(),
          },
        },
        {
          provide: CoverageService,
          useValue: {
            findCoveragesByQuote: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    healthService = module.get<HealthService>(HealthService);
    quoteService = module.get<QuoteService>(QuoteService);
    personService = module.get<PersonService>(PersonService);
    coverageService = module.get<CoverageService>(CoverageService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createPolicy', () => {
    it('should call the health service to create a policy', async () => {
      const createPersonDto: CreatePersonDto = {} as any;
      await controller.createPolicy(createPersonDto);
      expect(healthService.createHealthPolicy).toHaveBeenCalledWith(
        createPersonDto,
      );
    });
  });

  describe('createQuote', () => {
    it('should call the health service to create a quote', async () => {
      const createQuoteDto: CreateQuoteDto = {} as any;
      await controller.createQuote(createQuoteDto);
      expect(healthService.createHealthQuote).toHaveBeenCalledWith(createQuoteDto);
    });
  });

  describe('getQuote', () => {
    it('should call the quote service to get a quote', async () => {
      const params = { id: 1 };
      await controller.getQuote(params);
      expect(quoteService.getQuote).toHaveBeenCalledWith(params);
    });
  });

  describe('updateMembers', () => {
    it('should call the person service to update members', async () => {
      const body = { quote_id: '1', offering: 'test' };
      await controller.updateMembers(body);
      expect(personService.updatePersons).toHaveBeenCalledWith(
        body.quote_id,
        body.offering,
      );
    });
  });

  describe('createCoveragesForQuote', () => {
    it('should call the health service to create coverages for a quote', async () => {
      const quoteId = 1;
      const body = {};
      await controller.createCoveragesForQuote(quoteId, body);
      expect(healthService.createCoveragesForQuote).toHaveBeenCalledWith(
        quoteId,
        body,
      );
    });
  });

  describe('getCoveragesForQuote', () => {
    it('should call the coverage service to get coverages for a quote', async () => {
      const quoteId = 1;
      await controller.getCoveragesForQuote(quoteId);
      expect(coverageService.findCoveragesByQuote).toHaveBeenCalledWith(quoteId);
    });
  });

  describe('getPersonsInQuote', () => {
    it('should call the person service to get persons in a quote', async () => {
      const quoteId = 1;
      await controller.getPersonsInQuote(quoteId);
      expect(personService.findAllByQuoteId).toHaveBeenCalledWith(
        quoteId.toString(),
      );
    });
  });
});
