import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AuditDocument = HydratedDocument<Audit>;

@Schema({ timestamps: true, collection: 'audit' })
export class Audit {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  logId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true })
  adminId: mongoose.Types.ObjectId; // must be a user with role = admin

  @Prop({ type: String, required: true })
  action: string; // e.g., "updated design", "verified payment"

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  targetId: mongoose.Types.ObjectId; // could reference Design, Order, Payment, etc.

  @Prop({ type: Date, default: Date.now })
  timestamp: Date;

  @Prop({ type: String })
  details?: string; // extra info about the action
}

export const AuditSchema = SchemaFactory.createForClass(Audit);
