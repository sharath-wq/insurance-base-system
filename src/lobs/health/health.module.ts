import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthService } from './services/health.service';
import { HealthController } from './controllers/health.controller';
import { Person } from './entities/person.entity';
import { CoreModule } from '../../core/core.module';
import { PersonController } from './controllers/person.controller';
import { PersonService } from './services/person.service';
import { JarusModule } from 'src/jarus/jarus.module';
import { CoverageController } from './controllers/coverage.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Person]), CoreModule, JarusModule],
  controllers: [HealthController, PersonController, CoverageController],
  providers: [HealthService, PersonService],
  exports: [HealthService, PersonService],
})
export class HealthModule {}
