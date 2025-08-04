import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';
import { Contact } from './entities/contact.entity';
import { Address } from './entities/address.entity';
import { Policy } from './entities/policy.entity';
import { Agent } from './entities/agent.entity';
import { Agency } from './entities/agency.entity';
import { Trip } from './entities/trip.entity';
import { Coverable } from './entities/coverable.entity';
import { Coverage } from './entities/coverage.entity';
import { CovTerm } from './entities/cov-term.entity';
import { Vehicle } from '../lobs/auto/entites/vehicle.entity';
import { PaymentInfo } from './entities/payment-info.entity';
import { OfficialID } from './entities/official-id.entity';
import { Claim } from './entities/claim.entity';
import { PolicyContactRole } from './entities/policy-contact-role.entity';
import { IdentityType } from './entities/identity-type.entity';
import { Nationality } from './entities/nationality.entity';
import { Occupation } from './entities/occupation.entity';
import { Relation } from './entities/relation.entity';
import { MaritalStatus } from './entities/marital-status.entity';
import { PolicyService } from './services/policy.service';
import { QuoteService } from './services/quote.service';
import { Person } from 'src/lobs/health/entities/person.entity';
import { CoverageService } from './services/coverage.service';
import { ReferenceDataSeeder } from './seeders/reference-data.seeder';
import { SeedController } from './controllers/seed.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Quote,
      Contact,
      Address,
      Policy,
      Agent,
      Agency,
      Trip,
      Coverable,
      Coverage,
      CovTerm,
      Vehicle,
      PaymentInfo,
      OfficialID,
      Claim,
      PolicyContactRole,
      Person,
      IdentityType,
      Nationality,
      Occupation,
      Relation,
      MaritalStatus,
    ]),
  ],
  controllers: [SeedController],
  providers: [PolicyService, QuoteService, CoverageService, ReferenceDataSeeder],
  exports: [PolicyService, QuoteService, TypeOrmModule, CoverageService],
})
export class CoreModule {}
