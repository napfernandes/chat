import mongoose, { Document } from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';

import { CustomSchemaFactory } from './common/custom/custom-schema-factory';

export class UserConversation {
  @Prop({ type: mongoose.Types.ObjectId })
  conversationId: string;

  @Prop()
  createdAt?: Date;

  @Prop({ required: false })
  lastMessageAt?: Date;
}

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

  @Prop({ required: false })
  updatedAt?: Date;

  @Prop({ type: mongoose.Types.Array, _id: false })
  conversations?: UserConversation[];
}

export const UserSchema = CustomSchemaFactory.createForClass(User);
