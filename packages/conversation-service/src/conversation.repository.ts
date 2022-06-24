import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { MessageActionType } from './conversation.enum';
import { InsertActionToMessageError } from './errors/insert-action-to-message.error';
import { Conversation, ConversationMessage, MessageAction } from './conversation.schema';
import { InsertMessageToConversationError } from './errors/insert-message-to-conversation.error';

@Injectable()
export class ConversationRepository {
  constructor(
    @InjectModel(Conversation.name) private readonly ConversationModel: Model<Conversation>,
  ) {}

  async findConversationByIdOrHash(conversationIdOrHash: string): Promise<Conversation | null> {
    const conversation = await this.ConversationModel.findOne({
      $or: [{ email: conversationIdOrHash }, { _id: new ObjectId(conversationIdOrHash) }],
    }).exec();

    if (!conversation) {
      return null;
    }

    return conversation.toObject();
  }

  async insertMessageToConversation(
    conversationId: string,
    message: ConversationMessage,
  ): Promise<ConversationMessage> {
    message.id = new ObjectId().toString();
    message.actions = [
      ...(message.actions || []),
      {
        createdAt: new Date(),
        userId: message.userId,
        actionType: MessageActionType.MESSAGE_SENT,
      },
    ];

    const updateResult = await this.ConversationModel.updateOne(
      { _id: conversationId },
      { $push: { messages: message } },
    );

    if (!updateResult.acknowledged || updateResult.modifiedCount === 0) {
      throw new InsertMessageToConversationError(conversationId);
    }

    return message;
  }

  async insertActionToMessage(
    conversationId: string,
    messageId: string,
    action: MessageAction,
  ): Promise<MessageAction> {
    action.createdAt = new Date();

    const updateResult = await this.ConversationModel.updateOne(
      { _id: conversationId },
      { $push: { 'messages.$[message].actions': action } },
      { arrayFilters: [{ 'message.id': messageId }] },
    );

    if (!updateResult.acknowledged || updateResult.modifiedCount === 0) {
      throw new InsertActionToMessageError(conversationId);
    }

    return action;
  }
}
