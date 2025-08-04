import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entites/vehicle.entity';
import { PolicyService } from 'src/core/services/policy.service';
import { CreateVehicleDto } from './dtos/create-vehicle.dtos';
import { CreateQuoteDto } from 'src/core/dtos/create-quote.dto';
import { Quote } from 'src/core/entities/quote.entity';
import { QuoteService } from 'src/core/services/quote.service';
import { generateQuoteName } from 'src/utils/generate-quote-name';

@Injectable()
export class AutoService {
  private readonly logger = new Logger(AutoService.name);
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    private policyService: PolicyService,
    private quoteService: QuoteService,
  ) {}

  async createAutoPolicy(dto: CreateVehicleDto): Promise<Vehicle> {
    const vehicle = this.vehicleRepository.create({
      ...dto,
      createDt: new Date(),
      updateDt: new Date(),
    } as any);
    const result = await this.vehicleRepository.save(vehicle);
    return Array.isArray(result) ? result[0] : result;
  }

  async createAutoQuote(dto: CreateQuoteDto): Promise<Quote> {
    this.logger.log('Creating auto quote with DTO:', dto);
    return this.quoteService.createQuote(dto);
  }
}
