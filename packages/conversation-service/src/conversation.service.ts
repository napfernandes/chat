import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { QueueService } from './notification/queue.service';
import { ConversationOutput } from './models/conversation.output';
import { ConversationRepository } from './conversation.repository';
import { MessageActionInput } from './models/message-action.input';
import { MessageActionOutput } from './models/message-action.output';
import { ValidatorService } from './common/services/validator.service';
import { ConversationActionType } from './conversation-action-type.enum';
import { InsertConversationInput } from './models/insert-conversation.input';
import { ConversationMessageInput } from './models/conversation-message.input';
import { ConversationMessageOutput } from './models/conversation-message.output';
import InsertConversationValidator from './validators/insert-conversation.validator';
import SendActionToMessageValidator from './validators/send-action-to-message.validator';
import { Conversation, ConversationMessage, MessageAction } from './conversation.schema';
import SendMessageToConversationValidator from './validators/send-message-to-conversation.validator';

@Injectable()
export class ConversationService {
  constructor(
    private readonly queueService: QueueService,
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

    const conversationOutput = ConversationOutput.from(conversation.toObject());

    await this.queueService.sendMessageToQueue<ConversationOutput>({
      queueName: ConversationActionType.CONVERSATION_STARTED,
      messageBody: conversationOutput,
    });

    return conversationOutput;
  }

  async sendMessageToConversation(
    input: ConversationMessageInput,
  ): Promise<ConversationMessageOutput> {
    await this.validatorService.validate(SendMessageToConversationValidator, input);

    const message: ConversationMessage = { userId: input.userId, message: input.message };
    const conversationMessage = await this.conversationRepository.insertMessageToConversation(
      input.conversationIdOrHash,
      message,
    );

    return ConversationMessageOutput.from({ messageId: conversationMessage.id });
  }

  async sendActionToMessage(input: MessageActionInput): Promise<MessageActionOutput> {
    await this.validatorService.validate(SendActionToMessageValidator, input);

    const action: MessageAction = { userId: input.userId, actionType: input.actionType };
    await this.conversationRepository.insertActionToMessage(
      input.conversationIdOrHash,
      input.messageId,
      action,
    );

    return MessageActionOutput.from({ acknowledged: true });
  }

  async findConversations(): Promise<ConversationOutput[]> {
    const conversations = await this.ConversationModel.find({}).exec();

    return conversations.map((conversation) => ConversationOutput.from(conversation.toObject()));
  }
}
