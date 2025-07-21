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
      created_date: new Date(),
      updated_date: new Date(),
    });
    this.logger.log('Quote entity created:', quote);
    return this.quoteRepository.save(quote);
  }

  async getQuote(params: { id?: number; quote_name?: string }): Promise<any> {
    const { id, quote_name } = params;

    const quote = await this.quoteRepository.findOne({
      where: id ? { id } : { quote_name },
    });

    if (!quote) {
      throw new NotFoundException('Quote not found');
    }

    const persons = await this.personRepository.find({
      where: { quote: { id: quote.id } },
    });

    return {
      ...quote,
      members: persons,
    };
  }
}
