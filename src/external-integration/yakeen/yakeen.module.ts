import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Yakeen } from './entities/yakeen.entity';
import { YakeenController } from './controllers/yakeen.controller';
import { YakeenService } from './services/yakeen.service';

@Module({
  imports: [TypeOrmModule.forFeature([Yakeen])],
  controllers: [YakeenController],
  providers: [YakeenService],
})
export class YakeenModule {}
