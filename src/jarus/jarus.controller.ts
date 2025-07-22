import { Controller, Get, Query } from '@nestjs/common';
import { CoverageService } from './services/coverage.service';
import { RatingService } from './services/rating.service';
import { AttributeService } from './services/attributes.service';

@Controller('jarus')
export class JarusController {
  constructor(
    private readonly attributesService: AttributeService,
    private readonly coverageService: CoverageService,
    private readonly ratingService: RatingService,
  ) {}

  // Attributes
  @Get('attributes')
  getAttributes(
    @Query('objectName') objectName: string,
    @Query('objectType') objectType: string,
    @Query('lob') lob: string,
  ) {
    return this.attributesService.getAttributesFromJarus({
      objectName,
      objectType,
      lob,
    });
  }

  // Coverages
  @Get('coverages')
  getCoverages(
    @Query('objectName') objectName: string,
    @Query('objectType') objectType: string,
    @Query('lob') lob: string,
  ) {
    return this.coverageService.getCoveragesFromJarus({
      objectName,
      objectType,
      lob,
    });
  }

  // Rating
  @Get('rating')
  getRating(@Query('quote_id') quote_id: string) {
    return this.ratingService.getRatingFromJarus({
      quote_id,
    });
  }
}
