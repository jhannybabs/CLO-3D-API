import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { randomUUID } from "crypto";

export type DesignDocument = HydratedDocument<Designs>;
@Schema({ timestamps: true, collection: "designs" })
export class Designs {
  @Prop({ default: randomUUID })
  designId: string;

  @Prop({ required: true })
  designerId: string;

  @Prop({ required: true })
  designName: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  model3DFileUrl: string;

  @Prop({ required: true })
  previewImage: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: "draft", enum: ["draft", "published", "archived"] })
  status: string;
}

export const DesignSchema = SchemaFactory.createForClass(Designs);
