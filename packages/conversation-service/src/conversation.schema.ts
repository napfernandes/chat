import mongoose, { Document } from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';

import { CustomSchemaFactory } from './common/custom/custom-schema-factory';
import { ConversationType, ConversationActionType } from './conversation.enum';

export class ConversationAction {
  @Prop({ type: mongoose.Types.ObjectId })
  userId: string;

  @Prop()
  actionType: ConversationActionType;

  @Prop()
  createdAt: Date;
}

export class ConversationMessage {
  @Prop({ type: mongoose.Types.ObjectId })
  id?: string;

  @Prop({ type: mongoose.Types.ObjectId })
  userId: string;

  message: string;

  @Prop({ type: mongoose.Types.Array, _id: false })
  actions?: ConversationAction[] = [];
}

@Schema({
  autoIndex: true,
  autoCreate: true,
  timestamps: true,
})
export class Conversation extends Document {
  @Prop({ type: mongoose.Types.ObjectId })
  id: string;

  @Prop({ unique: true })
  hash: string;

  @Prop()
  members: string[];

  @Prop({ type: mongoose.Types.Array<mongoose.Types.ObjectId> })
  type: ConversationType;

  @Prop({ required: false })
  title?: string;

  @Prop({ required: false })
  description?: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt?: Date;

  @Prop({ type: mongoose.Types.Array, _id: false })
  messages: ConversationMessage[];
}

export const ConversationSchema = CustomSchemaFactory.createForClass(Conversation);
