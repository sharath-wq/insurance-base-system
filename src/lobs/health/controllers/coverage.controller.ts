import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CoverageService } from 'src/core/services/coverage.service';
import { Coverable } from 'src/core/entities/coverable.entity';
import { Coverage } from 'src/core/entities/coverage.entity';
import { CovTerm } from 'src/core/entities/cov-term.entity';
import { Quote } from 'src/core/entities/quote.entity';
import { CoverableType } from 'src/core/entities/coverable-type.entity';

@Controller('coverage')
export class CoverageController {
  constructor(private readonly coverageService: CoverageService) {}

  @Post('coverable')
  async createCoverable(
    @Body() coverableData: Partial<Coverable>,
  ): Promise<Coverable> {
    return this.coverageService.createCoverable(coverableData);
  }

  @Post('coverage')
  async createCoverage(
    @Body() coverageData: Partial<Coverage>,
  ): Promise<Coverage> {
    if (typeof coverageData.coverableID !== 'number') {
      throw new Error('coverableId is required and must be a number');
    }
    return this.coverageService.createCoverage(coverageData);
  }

  @Post('cov-term')
  async createCovTerm(@Body() covTermData: Partial<CovTerm>): Promise<CovTerm> {
    return this.coverageService.createCovTerm(covTermData);
  }

  // Removed non-existent methods from coverage service

  @Get('quote/:quoteId/coverages')
  async findCoveragesByQuote(
    @Param('quoteId', ParseIntPipe) quoteId: number,
  ): Promise<Coverage[]> {
    return this.coverageService.findCoveragesByQuote(quoteId);
  }

  // Removed endpoint that calls non-existent service method
}
