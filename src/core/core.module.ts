import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Insurance } from './entities/insurance.entity';
import { PolicyLob } from './entities/policy-lob.entity';
import { PolicyService } from './services/policy.service';

@Module({
  imports: [TypeOrmModule.forFeature([Insurance, PolicyLob])],
  providers: [PolicyService],
  exports: [PolicyService],
})
export class CoreModule {}
