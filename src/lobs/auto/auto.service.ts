import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entites/vehicle.entity';
import { PolicyService } from 'src/core/services/policy.service';
import { CreateVehicleDto } from './dtos/create-vehicle.dtos';

@Injectable()
export class AutoService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    private policyService: PolicyService,
  ) {}

  async createAutoPolicy(dto: CreateVehicleDto): Promise<Vehicle> {
    const vehicle = this.vehicleRepository.create(dto);
    await this.policyService.createPolicy({
      quote_id: dto.quote_id,
      status_id: 2, // DRAFT
      lob_id: 2, // AUTO
      policy_status_id: 3, // DRAFT
      account_id: 1,
      start_date: new Date(dto.start_date!),
      effective_date: new Date(dto.effective_date!),
      expiry_date: new Date(dto.expiry_date!),
      premium_novat: dto.premium_novat!,
      vat: dto.vat!,
      total_fee: dto.total_fee!,
      total_discount: dto.total_discount!,
      premium: dto.premium,
      payment_refference_id: dto.payment_refference_id,
      is_endorsement: dto.is_endorsement!,
      endorsment_type: dto.endorsment_type!,
    });
    return this.vehicleRepository.save(vehicle);
  }
}
