import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Conversation, ConversationMessage } from './conversation.schema';
import { ConversationActionType } from './conversation.enum';
import { ConversationOutput } from './models/conversation.output';
import { ConversationRepository } from './conversation.repository';
import { ValidatorService } from './common/services/validator.service';
import { InsertConversationInput } from './models/insert-conversation.input';
import { ConversationMessageInput } from './models/conversation-message.input';
import { ConversationMessageOutput } from './models/conversation-message.output';
import InsertConversationValidator from './validators/insert-conversation.validator';
import SendMessageToConversationValidator from './validators/send-message-to-conversation.validator';
@Injectable()
export class ConversationService {
  constructor(
    private readonly validatorService: ValidatorService,
    private readonly conversationRepository: ConversationRepository,
    @InjectModel(Conversation.name) private readonly ConversationModel: Model<Conversation>,
  ) {}

  private generateConversationHash(input: InsertConversationInput): string {
    return `conversation#${input.members.join(',')}#${Date.now()}`;
  }

  async insertConversation(input: InsertConversationInput): Promise<ConversationOutput> {
    await this.validatorService.validate(InsertConversationValidator, input);

    const conversation = new this.ConversationModel(input);
    conversation.hash = this.generateConversationHash(input);

    await conversation.save();

    return ConversationOutput.from(conversation.toObject());
  }

  async sendMessageToConversation(
    input: ConversationMessageInput,
  ): Promise<ConversationMessageOutput> {
    await this.validatorService.validate(SendMessageToConversationValidator, input);

    const conversationFound = await this.conversationRepository.findConversationByIdOrHash(
      input.conversationIdOrHash,
    );

    const message: ConversationMessage = { userId: input.userId, message: input.message };
    const conversationMessage = await this.conversationRepository.insertMessageToConversation(
      conversationFound.id,
      message,
    );

    return ConversationMessageOutput.from({ messageId: conversationMessage.id });
  }

  async findConversations(): Promise<ConversationOutput[]> {
    const conversations = await this.ConversationModel.find().exec();

    return conversations.map((conversation) => ConversationOutput.from(conversation.toJSON()));
  }
}
