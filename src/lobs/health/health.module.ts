import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { Person } from './entities/person.entity';
import { CoreModule } from '../../core/core.module';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { JarusModule } from 'src/jarus/jarus.module';

@Module({
  imports: [TypeOrmModule.forFeature([Person]), CoreModule, JarusModule],
  controllers: [HealthController, PersonController],
  providers: [HealthService, PersonService],
  exports: [HealthService, PersonService],
})
export class HealthModule {}
