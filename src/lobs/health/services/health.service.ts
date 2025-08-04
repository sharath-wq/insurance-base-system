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

  // Removed method that calls non-existent service method
}
