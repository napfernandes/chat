import { ConversationService } from './conversation.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ConversationOutput } from './models/conversation.output';
import { InsertConversationInput } from './models/insert-conversation.input';
import { ConversationMessageOutput } from './models/conversation-message.output';
import { ConversationMessageInput } from './models/conversation-message.input';

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

  @Query(() => [ConversationOutput])
  async findConversations(): Promise<ConversationOutput[]> {
    return this.conversationService.findConversations();
  }
}
