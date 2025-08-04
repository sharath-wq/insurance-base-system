import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../entities/person.entity';
import { CreatePersonDto } from '../dtos/create-person.dto';
import { PolicyService } from '../../../core/services/policy.service';
import { CreateQuoteDto } from 'src/core/dtos/create-quote.dto';
import { Quote } from 'src/core/entities/quote.entity';
import { QuoteService } from 'src/core/services/quote.service';
import { generateQuoteName } from 'src/utils/generate-quote-name';
import { IdentityType } from 'src/core/entities/identity-type.entity';
import { Nationality } from 'src/core/entities/nationality.entity';
import { Occupation } from 'src/core/entities/occupation.entity';
import { Relation } from 'src/core/entities/relation.entity';
import { MaritalStatus } from 'src/core/entities/marital-status.entity';
import { Coverage } from 'src/core/entities/coverage.entity';
import { CoverageService } from 'src/core/services/coverage.service';
import { ListCoverable } from 'src/common/enums';
import { CovTerm } from 'src/core/entities/cov-term.entity';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>,

    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    private policyService: PolicyService,
    private quoteService: QuoteService,

    @InjectRepository(IdentityType)
    private readonly identityTypeRepository: Repository<IdentityType>,

    @InjectRepository(Nationality)
    private readonly nationalityRepository: Repository<Nationality>,

    @InjectRepository(Occupation)
    private readonly occupationRepository: Repository<Occupation>,

    @InjectRepository(Relation)
    private readonly relationRepository: Repository<Relation>,

    @InjectRepository(MaritalStatus)
    private readonly maritalStatusRepository: Repository<MaritalStatus>,

    private readonly coverageService: CoverageService,
  ) {}

  async createHealthPolicy(dto: CreatePersonDto): Promise<Person> {
    const {
      quote_id,
      identity_type_id,
      nationality,
      occupation_code,
      relation,
      marital_status,
      ...personData
    } = dto;

    // Fetch related entities
    const quote = await this.quoteRepository.findOneByOrFail({ ID: quote_id });
    const identityType = await this.identityTypeRepository.findOneByOrFail({
      id: identity_type_id,
    });
    const nationalityRecord = await this.nationalityRepository.findOneByOrFail({
      code: nationality,
    });
    const occupation = await this.occupationRepository.findOneByOrFail({
      code: occupation_code,
    });
    const relationRecord = await this.relationRepository.findOneByOrFail({
      code: relation,
    });
    const maritalStatus = await this.maritalStatusRepository.findOneByOrFail({
      code: marital_status,
    });

    const person = this.personRepository.create({
      ...personData,
      quote,
      identity_type: identityType,
      nationality: nationalityRecord,
      occupation,
      relation: relationRecord,
      marital_status: maritalStatus,
    });

    // Create policy with new schema
    // Note: Adjust this according to your actual policy creation needs

    return this.personRepository.save(person);
  }

  async createHealthQuote(dto: CreateQuoteDto): Promise<Quote> {
    this.logger.log('Creating health quote with DTO:', dto);
    const quoteDto = {
      ...dto,
      quote_name: await generateQuoteName('H'),
      lob_id: 1, // Health LOB
    };
    return this.quoteService.createQuote(quoteDto);
  }

  async createCoveragesForQuote(quoteId: number, body: any): Promise<any> {
    this.logger.log(`Creating coverages for quote ${quoteId}:`, body);
    
    const { coverable, coverages } = body;
    
    // First, find the quote
    const quote = await this.quoteRepository.findOne({ where: { ID: quoteId } });
    if (!quote) {
      throw new Error(`Quote with ID ${quoteId} not found`);
    }
    
    // Find all persons associated with this quote
    const persons = await this.personRepository.find({
      where: { quote: { ID: quoteId } },
      relations: ['quote']
    });
    
    if (persons.length === 0) {
      throw new Error(`No persons found for quote with ID ${quoteId}`);
    }
    
    const results: any[] = [];
    
    // Create coverables for each person in the quote
    for (const person of persons) {
      const coverableEntity = await this.coverageService.createCoverable({
        quoteID: quote,
        personID: person,
        type: ListCoverable.Contact,
        effectiveDt: person.effective_date || new Date(),
        expirationDt: person.expiry_date || new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        createDt: new Date(),
        updateDt: new Date(),
      });
      
      const personResult = {
        personId: person.id,
        personName: person.emp_name,
        coverable: coverableEntity,
        categories: [] as any[]
      };
    
      // Process each category of coverages for this person
      for (const category of coverages) {
        const categoryResult = {
          category: category.category,
          coverages: [] as any[]
        };
        
        for (const coverage of category.coverages) {
          // Create coverage for this person
          const coverageEntity = await this.coverageService.createCoverage({
            name: coverage.name,
            premiumAmt: coverage.premium,
            coverableID: coverableEntity,
            effectiveDt: new Date(coverage.effectiveDate),
            expirationDt: new Date(coverage.expiryDate),
          });
          
          // Create terms for this coverage
          const terms: CovTerm[] = [];
          if (coverage.terms && coverage.terms.length > 0) {
            for (const term of coverage.terms) {
              const termEntity = await this.coverageService.createCovTerm({
                name: term.name,
                limitVal: term.limit,
                deductibleVal: term.deductible,
                covID: coverageEntity,
              });
              terms.push(termEntity);
            }
          }
          
          categoryResult.coverages.push({
            ...coverageEntity,
            terms
          });
        }
        
        personResult.categories.push(categoryResult);
      }
      
      results.push(personResult);
    }
    
    return {
      quoteId,
      totalPersons: persons.length,
      results
    };
  }
}
