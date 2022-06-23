import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Conversation } from './conversation.schema';
import { ConversationOutput } from './models/conversation.output';
import { ValidatorService } from './common/services/validator.service';
import { InsertConversationInput } from './models/insert-conversation.input';
import InsertConversationValidator from './validators/insert-conversation.validator';

@Injectable()
export class ConversationService {
  constructor(
    private readonly validatorService: ValidatorService,
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

  async findConversations(): Promise<ConversationOutput[]> {
    const conversations = await this.ConversationModel.find().exec();

    return conversations.map((conversation) => ConversationOutput.from(conversation.toJSON()));
  }
}
