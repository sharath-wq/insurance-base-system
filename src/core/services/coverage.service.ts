import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coverable } from '../entities/coverable.entity';
import { Coverage } from '../entities/coverage.entity';
import { CovTerm } from '../entities/cov-term.entity';
import { Quote } from '../entities/quote.entity';

@Injectable()
export class CoverageService {
  constructor(
    @InjectRepository(Coverable)
    private coverableRepository: Repository<Coverable>,
    @InjectRepository(Coverage)
    private coverageRepository: Repository<Coverage>,
    @InjectRepository(CovTerm)
    private covTermRepository: Repository<CovTerm>,
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>,
  ) {}

  async createCoverable(coverableData: Partial<Coverable>): Promise<Coverable> {
    const coverable = this.coverableRepository.create({
      ...coverableData,
      createDt: new Date(),
      updateDt: new Date(),
    });
    return this.coverableRepository.save(coverable);
  }

  async createCoverage(
    coverageData: Partial<Coverage>,
  ): Promise<Coverage> {
    const coverage = this.coverageRepository.create({
      ...coverageData,
      createDt: new Date(),
      updateDt: new Date(),
    });
    return this.coverageRepository.save(coverage);
  }

  async createCovTerm(covTermData: Partial<CovTerm>): Promise<CovTerm> {
    const covTerm = this.covTermRepository.create({
      ...covTermData,
      createDt: new Date(),
      updateDt: new Date(),
    });
    return this.covTermRepository.save(covTerm);
  }

  async findCoveragesByQuote(quoteId: number): Promise<Coverage[]> {
    const quote = await this.quoteRepository.findOne({
      where: { ID: quoteId },
    });
    if (!quote) {
      throw new NotFoundException(`Quote with ID ${quoteId} not found`);
    }

    const coverables = await this.coverableRepository.find({
      where: { quoteID: quote },
    });
    
    const coverages: Coverage[] = [];
    for (const coverable of coverables) {
      const coverableCoverages = await this.coverageRepository.find({
        where: { coverableID: coverable },
        relations: ['covTerms'],
      });
      coverages.push(...coverableCoverages);
    }
    
    return coverages;
  }
}
