import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { randomInt } from 'crypto';

export type DesignDocument = HydratedDocument<Designs>;

@Schema({ timestamps: true, collection: 'designs' })
export class Designs {
  @Prop({ default: () => randomInt(100000, 999999), unique: true })
  designId: number;

  @Prop({ required: true })
  designName: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  imageUrl: string;
}

export const DesignSchema = SchemaFactory.createForClass(Designs);
