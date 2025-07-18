import { Controller, Post, Body } from '@nestjs/common';
import { HealthService } from './health.service';
import { CreatePersonDto } from './dtos/create-person.dto';
import { Person } from './entities/person.entity';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Post('policy')
  async createPolicy(
    @Body() createPersonDto: CreatePersonDto,
  ): Promise<Person> {
    return this.healthService.createHealthPolicy(createPersonDto);
  }
}
