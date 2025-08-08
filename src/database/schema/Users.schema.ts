import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { randomUUID } from 'crypto';

export type UserDocument = HydratedDocument<Users>;

@Schema({ timestamps: true, collection: 'users' })
export class Users {
  @Prop({ default: randomUUID })
  userId: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: string;

  @Prop({
    default:
      'https://www.dropbox.com/scl/fi/d7ioe7bosz1c5fiu2kmor/blank_avatar.svg?rlkey=d3ek8qx9pxle8alp09xgfs1zv&st=255oxm4b&raw=1',
  })
  avatar: string;

  @Prop({ default: false })
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(Users);
