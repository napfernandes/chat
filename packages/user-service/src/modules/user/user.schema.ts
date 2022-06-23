import mongoose, { Document } from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';

import { CustomSchemaFactory } from '../../common/custom';

@Schema({
  autoIndex: true,
  autoCreate: true,
  timestamps: true,
})
export class User extends Document {
  @Prop({ type: mongoose.Types.ObjectId })
  id: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  salt: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt?: Date;
}

export const UserSchema = CustomSchemaFactory.createForClass(User);
