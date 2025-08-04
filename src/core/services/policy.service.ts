import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Policy } from '../entities/policy.entity';
import { CreatePolicyDto } from '../dtos/create-policy.dto';
import { Quote } from '../entities/quote.entity';

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(Policy)
    private policyRepository: Repository<Policy>,
  ) {}

  async createPolicy(dto: CreatePolicyDto): Promise<Policy> {
    const policy = this.policyRepository.create({
      ...dto,
      createDt: new Date(),
      updateDt: new Date(),
    } as any);
    const result = await this.policyRepository.save(policy);
    return Array.isArray(result) ? result[0] : result;
  }

  async findPoliciesByProduct(productId: string): Promise<Policy[]> {
    return this.policyRepository.find({ where: { productID: productId as any } });
  }
}
