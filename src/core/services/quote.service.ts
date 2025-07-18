import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from '../entities/quote.entity';
import { CreateQuoteDto } from '../dtos/create-quote.dto';

@Injectable()
export class QuoteService {
  private readonly logger = new Logger(QuoteService.name);

  constructor(
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>,
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
}
