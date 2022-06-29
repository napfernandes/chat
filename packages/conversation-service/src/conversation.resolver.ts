import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ConversationService } from './conversation.service';
import { ConversationOutput } from './models/conversation.output';
import { MessageActionInput } from './models/message-action.input';
import { MessageActionOutput } from './models/message-action.output';
import { InsertConversationInput } from './models/insert-conversation.input';
import { ConversationMessageInput } from './models/conversation-message.input';
import { ConversationMessageOutput } from './models/conversation-message.output';

@Resolver(() => ConversationOutput)
export class ConversationResolver {
  constructor(private readonly conversationService: ConversationService) {}

  @Mutation(() => ConversationOutput)
  async insertConversation(
    @Args('input') input: InsertConversationInput,
  ): Promise<ConversationOutput> {
    return this.conversationService.insertConversation(input);
  }

  @Mutation(() => ConversationMessageOutput)
  async sendMessageToConversation(
    @Args('input') input: ConversationMessageInput,
  ): Promise<ConversationMessageOutput> {
    return this.conversationService.sendMessageToConversation(input);
  }

  @Mutation(() => MessageActionOutput)
  async sendActionToMessage(
    @Args('input') input: MessageActionInput,
  ): Promise<MessageActionOutput> {
    return this.conversationService.sendActionToMessage(input);
  }

  @Query(() => [ConversationOutput])
  async findConversations(): Promise<ConversationOutput[]> {
    return this.conversationService.findConversations();
  }
}
