import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Put,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { HealthService } from '../services/health.service';
import { CreatePersonDto } from '../dtos/create-person.dto';
import { Person } from '../entities/person.entity';
import { CreateQuoteDto } from 'src/core/dtos/create-quote.dto';
import { Quote } from 'src/core/entities/quote.entity';
import { QuoteService } from 'src/core/services/quote.service';
import { PersonService } from '../services/person.service';
import { Coverage } from 'src/core/entities/coverage.entity';
import { CoverageService } from 'src/core/services/coverage.service';

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthService: HealthService,
    private readonly quoteService: QuoteService,
    private readonly personService: PersonService,
    private readonly coverageService: CoverageService,
  ) {}

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

  @Get()
  getQuote(@Query() params: { id?: number; quote_name?: string }) {
    return this.quoteService.getQuote(params);
  }

  @Put('update-members')
  updateMembers(@Body() body: { quote_id: string; offering: string }) {
    return this.personService.updatePersons(body.quote_id, body.offering);
  }

  @Post('quote/:id/coverages')
  async createCoveragesForQuote(
    @Param('id', ParseIntPipe) quoteId: number,
    @Body() body: any,
  ): Promise<any> {
    return this.healthService.createCoveragesForQuote(quoteId, body);
  }

  @Get('quote/:id/coverages')
  async getCoveragesForQuote(
    @Param('id', ParseIntPipe) quoteId: number,
  ): Promise<Coverage[]> {
    return this.coverageService.findCoveragesByQuote(quoteId);
  }

  @Get('quote/:id/persons')
  async getPersonsInQuote(
    @Param('id', ParseIntPipe) quoteId: number,
  ): Promise<any> {
    return this.personService.findAllByQuoteId(quoteId.toString());
  }
}
