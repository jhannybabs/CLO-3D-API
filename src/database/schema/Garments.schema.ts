import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GarmentDocument = HydratedDocument<Garments>;

@Schema({ timestamps: true, collection: 'garments' })
export class Garments {
  @Prop({ required: true })
  garmentName: string;

  @Prop({ required: true, enum: ['shirt', 'shorts'] })
  category: string;

  @Prop({ required: true })
  model3DFileUrl: string;

  @Prop({ required: true })
  previewImage: string;

  @Prop({ type: [String], default: [] })
  designAreas: string[];
}

export const GarmentSchema = SchemaFactory.createForClass(Garments);
