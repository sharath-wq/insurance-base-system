import { Body, Controller, Post } from '@nestjs/common';
import { AutoService } from './auto.service';
import { CreateVehicleDto } from './dtos/create-vehicle.dtos';
import { Vehicle } from './entites/vehicle.entity';

@Controller('auto')
export class AutoController {
  constructor(private readonly autoService: AutoService) {}

  @Post('policy')
  async createPolicy(
    @Body() createVehicleDto: CreateVehicleDto,
  ): Promise<Vehicle> {
    return this.autoService.createAutoPolicy(createVehicleDto);
  }
}
