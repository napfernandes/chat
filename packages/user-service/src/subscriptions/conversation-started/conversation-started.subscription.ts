import { Injectable } from '@nestjs/common';

import { UserService } from '../../user.service';
import { SubscriptionMessage } from '@napfernandes/pubsub';
import { ConversationOutput } from './conversation.output';
import { ConversationActionType } from './conversation-action-type.enum';
import { BaseSubscription, SubscriptionService } from '@napfernandes/pubsub';

@Injectable()
export class ConversationStartedSubscription extends BaseSubscription<ConversationOutput> {
  constructor(subscriptionService: SubscriptionService, private readonly userService: UserService) {
    super(subscriptionService);
  }

  get topicName(): string {
    return ConversationActionType.CONVERSATION_STARTED;
  }

  async onSubscribe(message: SubscriptionMessage<ConversationOutput>): Promise<void> {
    const insertConversationToUserPromises = message.body.members.map((userId: string) => {
      return this.userService.insertConversationToUser({ userId, conversationId: message.body.id });
    });

    await Promise.all(insertConversationToUserPromises);
  }
}
