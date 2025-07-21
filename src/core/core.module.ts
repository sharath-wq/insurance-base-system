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
    ]),
  ],
  providers: [PolicyService, QuoteService],
  exports: [PolicyService, QuoteService, TypeOrmModule],
})
export class CoreModule {}
