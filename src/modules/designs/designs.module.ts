import { Module } from '@nestjs/common';
import { DesignsService } from './designs.service';
import { DesignsController } from './designs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DesignSchema, Designs } from 'src/database/schema/Designs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Designs.name, schema: DesignSchema }]),
  ],
  controllers: [DesignsController],
  providers: [DesignsService],
})
export class DesignsModule {}
