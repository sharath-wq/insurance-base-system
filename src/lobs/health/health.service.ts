import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { CreatePersonDto } from './dtos/create-person.dto';
import { PolicyService } from '../../core/services/policy.service';

@Injectable()
export class HealthService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    private policyService: PolicyService,
  ) {}

  async createHealthPolicy(dto: CreatePersonDto): Promise<Person> {
    const person = this.personRepository.create(dto);
    await this.policyService.createPolicy({
      quote_id: dto.quote_id,
      status_id: 2, // DRAFT
      lob_id: 1, // HEALTH
      policy_status_id: 3, // DRAFT
      account_id: 1,
      start_date: new Date(dto.start_date),
      effective_date: new Date(dto.effective_date),
      expiry_date: new Date(dto.expiry_date),
      premium_novat: dto.premium_novat,
      vat: dto.vat,
      total_fee: dto.total_fee,
      total_discount: dto.total_discount,
      premium: dto.premium,
      payment_refference_id: dto.payment_refference_id,
      is_endorsement: dto.is_endorsement!,
      endorsment_type: dto.endorsment_type!,
    });
    return this.personRepository.save(person);
  }
}
