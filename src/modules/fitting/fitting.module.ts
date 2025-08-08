import { Module } from '@nestjs/common';
import { FittingService } from './fitting.service';
import { FittingController } from './fitting.controller';

@Module({
  controllers: [FittingController],
  providers: [FittingService],
})
export class FittingModule {}
