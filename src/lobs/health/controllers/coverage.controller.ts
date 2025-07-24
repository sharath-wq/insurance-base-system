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
    if (typeof coverageData.coverableId !== 'number') {
      throw new Error('coverableId is required and must be a number');
    }
    return this.coverageService.createCoverage(
      coverageData,
      coverageData.coverableId,
    );
  }

  @Post('cov-term')
  async createCovTerm(@Body() covTermData: Partial<CovTerm>): Promise<CovTerm> {
    return this.coverageService.createCovTerm(covTermData);
  }

  @Post('quote')
  async createQuote(@Body() quoteData: Partial<Quote>): Promise<Quote> {
    return this.coverageService.createQuote(quoteData);
  }

  @Post('coverable-type')
  async createCoverableType(
    @Body() coverableTypeData: Partial<CoverableType>,
  ): Promise<CoverableType> {
    return this.coverageService.createCoverableType(coverableTypeData);
  }

  @Get('quote/:quoteId/coverages')
  async findCoveragesByQuote(
    @Param('quoteId', ParseIntPipe) quoteId: number,
  ): Promise<Coverage[]> {
    return this.coverageService.findCoveragesByQuote(quoteId);
  }

  @Post('quote/:quoteId/coverages')
  async createCoveragesForQuote(
    @Param('quoteId', ParseIntPipe) quoteId: number,
    @Body()
    body: {
      coverable: {
        coverableItemId: number;
        coverableType: string;
        accountId: number;
      };
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
    return this.coverageService.createCoveragesForQuote(
      quoteId,
      body.coverable,
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
