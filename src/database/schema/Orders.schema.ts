import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { randomInt } from 'crypto';

export type OrdersDocument = HydratedDocument<Orders>;

@Schema({ timestamps: true, collection: 'orders' })
export class Orders {
  @Prop({ default: () => randomInt(100000, 999999), unique: true })
  orderId: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true })
  userId: mongoose.Types.ObjectId;

  @Prop({
    type: [
      {
        designId: { type: Number, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    required: true,
  })
  items: {
    designId: number;
    quantity: number;
    price: number;
  }[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({
    required: true,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Payments', required: true })
  paymentId: mongoose.Types.ObjectId;
}

export const OrdersSchema = SchemaFactory.createForClass(Orders);
