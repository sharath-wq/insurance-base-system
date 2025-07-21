import { Module } from '@nestjs/common';
import { CoverageService } from './services/coverage.service';
import { RatingService } from './services/rating.service';
import { JarusController } from './jarus.controller';
import { AttributeService } from './services/attributes.service';
import { HttpModule } from '@nestjs/axios';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [HttpModule, CoreModule],
  controllers: [JarusController],
  providers: [AttributeService, CoverageService, RatingService],
  exports: [AttributeService, CoverageService, RatingService],
})
export class JarusModule {}
