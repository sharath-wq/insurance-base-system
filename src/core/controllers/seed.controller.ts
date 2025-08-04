import { Controller, Post } from '@nestjs/common';
import { ReferenceDataSeeder } from '../seeders/reference-data.seeder';

@Controller('seed')
export class SeedController {
  constructor(private readonly referenceDataSeeder: ReferenceDataSeeder) {}

  @Post('reference-data')
  async seedReferenceData(): Promise<{ message: string }> {
    await this.referenceDataSeeder.seedAll();
    return { message: 'Reference data seeded successfully' };
  }
}
