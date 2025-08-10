import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { randomInt } from 'crypto';

export type PaymentsDocument = HydratedDocument<Payments>;

@Schema({ timestamps: true, collection: 'payments' })
export class Payments {
  @Prop({ default: () => randomInt(100000, 999999), unique: true })
  paymentId: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Orders', required: true })
  orderId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true })
  userId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, enum: ['gcash', 'creditCard', 'maya'] })
  paymentMethod: string;

  @Prop({ unique: true, sparse: true })
  transactionId?: string;

  @Prop({
    required: true,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  })
  status: string;

  @Prop()
  paidAt?: Date;
}

export const PaymentsSchema = SchemaFactory.createForClass(Payments);
