import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Insurance } from '../entities/insurance.entity';
import { CreatePolicyDto } from '../dtos/create-policy.dto';

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(Insurance)
    private policyRepository: Repository<Insurance>,
  ) {}

  async createPolicy(dto: CreatePolicyDto): Promise<Insurance> {
    const policy = this.policyRepository.create(dto);
    return this.policyRepository.save(policy);
  }

  async findPoliciesByLob(lobId: number): Promise<Insurance[]> {
    return this.policyRepository.find({ where: { lob: { id: lobId } } });
  }
}
