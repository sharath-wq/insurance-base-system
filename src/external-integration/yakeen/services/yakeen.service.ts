import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Yakeen } from '../entities/yakeen.entity';

@Injectable()
export class YakeenService {
  constructor(
    @InjectRepository(Yakeen)
    private readonly yakeenRepository: Repository<Yakeen>,
  ) {}

  async findByIqamaId(iqamaId: string): Promise<Yakeen> {
    const yakeen = await this.yakeenRepository.findOne({ where: { iqamaId } });
    if (!yakeen) {
      throw new Error(`Yakeen entity not found for iqamaId: ${iqamaId}`);
    }
    return yakeen;
  }
}
