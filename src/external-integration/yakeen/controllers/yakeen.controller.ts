import { Controller, Get, Param } from '@nestjs/common';
import { YakeenService } from '../services/yakeen.service';
import { Yakeen } from '../entities/yakeen.entity';

@Controller('yakeen')
export class YakeenController {
  constructor(private readonly yakeenService: YakeenService) {}

  @Get(':iqamaId')
  findByIqamaId(@Param('iqamaId') iqamaId: string): Promise<Yakeen> {
    return this.yakeenService.findByIqamaId(iqamaId);
  }
}
