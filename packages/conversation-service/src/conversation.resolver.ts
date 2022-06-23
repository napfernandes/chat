import { ConversationService } from './conversation.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ConversationOutput } from './models/conversation.output';
import { InsertConversationInput } from './models/insert-conversation.input';

@Resolver(() => ConversationOutput)
export class ConversationResolver {
  constructor(private readonly conversationService: ConversationService) {}

  @Mutation(() => ConversationOutput)
  async insertConversation(
    @Args('input') input: InsertConversationInput,
  ): Promise<ConversationOutput> {
    return this.conversationService.insertConversation(input);
  }

  @Query(() => [ConversationOutput])
  async findConversations(): Promise<ConversationOutput[]> {
    return this.conversationService.findConversations();
  }
}
