import { Module } from '@nestjs/common';
import { YakeenModule } from './yakeen/yakeen.module';

@Module({
  imports: [YakeenModule],
})
export class ExternalIntegrationModule {}
