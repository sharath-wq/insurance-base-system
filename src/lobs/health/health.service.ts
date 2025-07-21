import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { CreatePersonDto } from './dtos/create-person.dto';
import { PolicyService } from '../../core/services/policy.service';
import { CreateQuoteDto } from 'src/core/dtos/create-quote.dto';
import { Quote } from 'src/core/entities/quote.entity';
import { QuoteService } from 'src/core/services/quote.service';
import { generateQuoteName } from 'src/utils/generate-quote-name';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    private policyService: PolicyService,
    private quoteService: QuoteService,
  ) {}

  async createHealthPolicy(dto: CreatePersonDto): Promise<Person> {
    const person = this.personRepository.create(dto);
    await this.policyService.createPolicy({
      quote_id: dto.quote_id,
      status_id: 2, // DRAFT
      lob_id: 1, // HEALTH
      policy_status_id: 3, // DRAFT
      account_id: 1,
      start_date: new Date(dto.start_date),
      effective_date: new Date(dto.effective_date),
      expiry_date: new Date(dto.expiry_date),
      premium_novat: dto.premium_novat,
      vat: dto.vat,
      total_fee: dto.total_fee,
      total_discount: dto.total_discount,
      premium: dto.premium,
      payment_refference_id: dto.payment_refference_id,
      is_endorsement: dto.is_endorsement!,
      endorsment_type: dto.endorsment_type!,
      created_date: new Date(),
      updated_date: new Date(),
    });
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
}
