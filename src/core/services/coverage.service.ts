import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coverable } from '../entities/coverable.entity';
import { CoverableType } from '../entities/coverable-type.entity';
import { Coverage } from '../entities/coverage.entity';
import { CovTerm } from '../entities/cov-term.entity';
import { Quote } from '../entities/quote.entity';
import { Account } from '../entities/account.entity';

@Injectable()
export class CoverageService {
  constructor(
    @InjectRepository(Coverable)
    private coverableRepository: Repository<Coverable>,
    @InjectRepository(CoverableType)
    private coverableTypeRepository: Repository<CoverableType>,
    @InjectRepository(Coverage)
    private coverageRepository: Repository<Coverage>,
    @InjectRepository(CovTerm)
    private covTermRepository: Repository<CovTerm>,
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async createCoverable(coverableData: Partial<Coverable>): Promise<Coverable> {
    const account = await this.accountRepository.findOne({
      where: { id: coverableData.accountId },
    });
    if (!account) {
      throw new NotFoundException(
        `Account with ID ${coverableData.accountId} not found`,
      );
    }
    const coverable = this.coverableRepository.create(coverableData);
    return this.coverableRepository.save(coverable);
  }

  async createCoverage(
    coverageData: Partial<Coverage>,
    coverableId: number,
  ): Promise<Coverage> {
    const coverable = await this.coverableRepository.findOne({
      where: { id: coverableId },
    });
    if (!coverable) {
      throw new NotFoundException(`Coverable with ID ${coverableId} not found`);
    }
    const coverage = this.coverageRepository.create({
      ...coverageData,
      coverableId,
    });
    return this.coverageRepository.save(coverage);
  }

  async createCovTerm(covTermData: Partial<CovTerm>): Promise<CovTerm> {
    const coverage = await this.coverageRepository.findOne({
      where: { id: covTermData.coverageId },
    });
    if (!coverage) {
      throw new NotFoundException(
        `Coverage with ID ${covTermData.coverageId} not found`,
      );
    }
    const covTerm = this.covTermRepository.create(covTermData);
    return this.covTermRepository.save(covTerm);
  }

  async createQuote(quoteData: Partial<Quote>): Promise<Quote> {
    const quote = this.quoteRepository.create(quoteData);
    return this.quoteRepository.save(quote);
  }

  async createCoverableType(
    coverableTypeData: Partial<CoverableType>,
  ): Promise<CoverableType> {
    const coverableType =
      this.coverableTypeRepository.create(coverableTypeData);
    return this.coverableTypeRepository.save(coverableType);
  }

  async findCoveragesByQuote(quoteId: number): Promise<Coverage[]> {
    const coverables = await this.coverableRepository.find({
      where: { quoteId },
    });
    return this.coverageRepository.find({
      where: coverables.map((c) => ({ coverableId: c.id })),
      relations: ['coverable', 'covTerms'],
    });
  }

  async createCoveragesForQuote(
    quoteId: number,
    coverableData: {
      coverableItemId: number;
      coverableType: string;
      accountId: number;
    },
    coveragesData: {
      category: string;
      coverages: {
        name: string;
        code: string;
        premium: number;
        effectiveDate: Date;
        expiryDate: Date;
        terms: {
          name: string;
          code: string;
          limit: number;
          deductible: number;
        }[];
      }[];
    }[],
  ): Promise<Coverage[]> {
    // Verify quote exists
    const quote = await this.quoteRepository.findOne({
      where: { id: quoteId },
    });
    if (!quote) {
      throw new NotFoundException(`Quote with ID ${quoteId} not found`);
    }

    // Create or find coverable type
    let coverableType = await this.coverableTypeRepository.findOne({
      where: { type: coverableData.coverableType },
    });
    if (!coverableType) {
      coverableType = await this.createCoverableType({
        type: coverableData.coverableType,
      });
    }

    // Find existing coverable or create a new one
    let coverable = await this.coverableRepository.findOne({
      where: { quoteId, coverableItemId: coverableData.coverableItemId },
    });
    if (!coverable) {
      coverable = await this.createCoverable({
        quoteId,
        coverableItemId: coverableData.coverableItemId,
        coverableTypeId: coverableType.id,
        accountId: coverableData.accountId,
        createdDate: new Date(),
        updatedDate: new Date(),
      });
    }

    // Delete existing coverage and cov_term records for the coverable
    const existingCoverages = await this.coverageRepository.find({
      where: { coverableId: coverable.id },
    });
    for (const coverage of existingCoverages) {
      await this.covTermRepository.delete({ coverageId: coverage.id });
    }
    await this.coverageRepository.delete({ coverableId: coverable.id });

    const createdCoverages: Coverage[] = [];

    // Create new coverages and terms for each category
    for (const category of coveragesData) {
      for (const coverageData of category.coverages) {
        const coverage = await this.createCoverage(
          {
            name: coverageData.name,
            code: coverageData.code,
            category: category.category,
            premium: coverageData.premium,
            effectiveDate: coverageData.effectiveDate,
            expiryDate: coverageData.expiryDate,
            createdDate: new Date(),
            updatedDate: new Date(),
          },
          coverable.id,
        );

        // Create coverage terms
        for (const term of coverageData.terms) {
          await this.createCovTerm({
            name: term.name,
            code: term.code,
            limit: term.limit,
            deductible: term.deductible,
            coverageId: coverage.id,
            createdDate: new Date(),
            updatedDate: new Date(),
          });
        }

        createdCoverages.push(coverage);
      }
    }

    return createdCoverages;
  }
}
