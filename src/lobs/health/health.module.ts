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
import { IdentityType } from 'src/core/entities/identity-type.entity';
import { Nationality } from 'src/core/entities/nationality.entity';
import { Occupation } from 'src/core/entities/occupation.entity';
import { Relation } from 'src/core/entities/relation.entity';
import { MaritalStatus } from 'src/core/entities/marital-status.entity';
import { Quote } from 'src/core/entities/quote.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Person,
      IdentityType,
      Nationality,
      Occupation,
      Relation,
      MaritalStatus,
      Quote,
    ]),
    CoreModule,
    JarusModule,
  ],
  controllers: [HealthController, PersonController, CoverageController],
  providers: [HealthService, PersonService],
  exports: [HealthService, PersonService],
})
export class HealthModule {}
