import { Controller, Post, Body } from '@nestjs/common';
import { HealthService } from './health.service';
import { CreatePersonDto } from './dtos/create-person.dto';
import { Person } from './entities/person.entity';
import { CreateQuoteDto } from 'src/core/dtos/create-quote.dto';
import { Quote } from 'src/core/entities/quote.entity';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Post('policy')
  async createPolicy(
    @Body() createPersonDto: CreatePersonDto,
  ): Promise<Person> {
    return this.healthService.createHealthPolicy(createPersonDto);
  }

  @Post('quote')
  async createQuote(@Body() createQuoteDto: CreateQuoteDto): Promise<Quote> {
    return this.healthService.createHealthQuote(createQuoteDto);
  }
}
