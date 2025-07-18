import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutoService } from './auto.service';
import { AutoController } from './auto.controller';
import { Vehicle } from './entites/vehicle.entity';
import { CoreModule } from '../../core/core.module';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle]), CoreModule],
  controllers: [AutoController],
  providers: [AutoService],
})
export class AutoModule {}
