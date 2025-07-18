import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { Person } from './entities/person.entity';
import { CoreModule } from '../../core/core.module';

@Module({
  imports: [TypeOrmModule.forFeature([Person]), CoreModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
