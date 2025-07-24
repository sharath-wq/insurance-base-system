import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Insurance } from './entities/insurance.entity';
import { PolicyLob } from './entities/policy-lob.entity';
import { Quote } from './entities/quote.entity';
import { Status } from './entities/status.entity';
import { PolicyStatus } from './entities/policy-status.entity';
import { Account } from './entities/account.entity';
import { PaymentDetails } from './entities/payment-details.entity';
import { IdentityType } from './entities/identity-type.entity';
import { Nationality } from './entities/nationality.entity';
import { Occupation } from './entities/occupation.entity';
import { Relation } from './entities/relation.entity';
import { MaritalStatus } from './entities/marital-status.entity';
import { Driver } from './entities/driver.entity';
import { Contact } from './entities/contact.entity';
import { Address } from './entities/address.entity';
import { PolicyService } from './services/policy.service';
import { QuoteService } from './services/quote.service';
import { Person } from 'src/lobs/health/entities/person.entity';
import { CoverageService } from './services/coverage.service';
import { Coverable } from './entities/coverable.entity';
import { CoverableType } from './entities/coverable-type.entity';
import { Coverage } from './entities/coverage.entity';
import { CovTerm } from './entities/cov-term.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Insurance,
      PolicyLob,
      Quote,
      Status,
      PolicyStatus,
      Account,
      PaymentDetails,
      IdentityType,
      Nationality,
      Occupation,
      Relation,
      MaritalStatus,
      Driver,
      Contact,
      Address,
      Person,
      Coverable,
      CoverableType,
      Coverage,
      CovTerm,
    ]),
  ],
  providers: [PolicyService, QuoteService, CoverageService],
  exports: [PolicyService, QuoteService, TypeOrmModule, CoverageService],
})
export class CoreModule {}
