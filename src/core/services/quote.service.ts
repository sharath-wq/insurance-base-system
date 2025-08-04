import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from '../entities/quote.entity';
import { CreateQuoteDto } from '../dtos/create-quote.dto';
import { Person } from 'src/lobs/health/entities/person.entity';

@Injectable()
export class QuoteService {
  private readonly logger = new Logger(QuoteService.name);

  constructor(
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>,

    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  async createQuote(dto: CreateQuoteDto): Promise<Quote> {
    this.logger.log('Creating quote with DTO:', dto);
    const quote = this.quoteRepository.create({
      ...dto,
      createDt: new Date(),
      updateDt: new Date(),
    } as any);
    this.logger.log('Quote entity created:', quote);
    const result = await this.quoteRepository.save(quote);
    return Array.isArray(result) ? result[0] : result;
  }

  async getQuote(params: { id?: number; quote_name?: string }): Promise<any> {
    const { id, quote_name } = params;

    const quote = await this.quoteRepository.findOne({
      where: id ? { ID: id } : {},
    });

    if (!quote) {
      throw new NotFoundException('Quote not found');
    }

    const persons = await this.personRepository.find({
      where: { quote: { ID: quote.ID } },
    });

    return {
      ...quote,
      members: persons,
    };
  }
}
