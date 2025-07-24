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

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthService: HealthService,
    private readonly quoteService: QuoteService,
    private readonly personService: PersonService,
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

  @Post('quote/:quoteId/coverages')
  async createHealthCoverages(
    @Param('quoteId', ParseIntPipe) quoteId: number,
    @Body()
    body: {
      coverable: { coverableItemId: number; accountId: number };
      coverages: {
        category: string;
        coverages: {
          name: string;
          code: string;
          premium: number;
          effectiveDate: string;
          expiryDate: string;
          terms: {
            name: string;
            code: string;
            limit: number;
            deductible: number;
          }[];
        }[];
      }[];
    },
  ): Promise<Coverage[]> {
    return this.healthService.createHealthCoverages(
      quoteId,
      { ...body.coverable, coverableType: 'health' },
      body.coverages.map((cat) => ({
        ...cat,
        coverages: cat.coverages.map((cov) => ({
          ...cov,
          effectiveDate: new Date(cov.effectiveDate),
          expiryDate: new Date(cov.expiryDate),
        })),
      })),
    );
  }
}
