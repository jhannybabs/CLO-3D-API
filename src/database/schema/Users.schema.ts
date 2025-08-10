import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<Users>;

@Schema({ timestamps: true, collection: 'users' })
export class Users {
  @Prop({ default: randomUUID, unique: true })
  userId: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['user', 'admin'], default: 'user' })
  role: string;

  @Prop({
    default:
      'https://www.dropbox.com/scl/fi/d7ioe7bosz1c5fiu2kmor/blank_avatar.svg?rlkey=d3ek8qx9pxle8alp09xgfs1zv&st=255oxm4b&raw=1',
  })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(Users);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
