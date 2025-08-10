import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type OrderDocument = HydratedDocument<Orders>;

class OrderItem {
  @Prop({ type: Types.ObjectId, ref: 'Products', required: true })
  productId: Types.ObjectId; 

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number; 
}

@Schema({ timestamps: true, collection: 'orders' })
export class Orders {
  @Prop({ type: Types.ObjectId, ref: 'Users', required: true })
  userId: Types.ObjectId; 

  @Prop({ type: [OrderItem], required: true })
  items: OrderItem[];

  @Prop({
    required: true,
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  })
  status: string;

  @Prop()
  totalAmount: number;

  @Prop()
  shippingAddress: string;

  @Prop()
  paymentMethod: string;
}

export const OrderSchema = SchemaFactory.createForClass(Orders);

OrderSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('items')) {
    this.totalAmount = this.items.reduce((total, item) => total + item.quantity * item.price, 0);
  }
  next();
});