import { Module } from '@nestjs/common';

import { QueueModule } from '@napfernandes/queue';
import { PubsubModule, SubscriptionService } from '@napfernandes/pubsub';
import { ConversationStartedSubscription } from './conversation-started.subscription';

@Module({
  imports: [PubsubModule, QueueModule],
  providers: [SubscriptionService, ConversationStartedSubscription],
})
export class SubscriptionModule {
  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly conversationStartedSubscription: ConversationStartedSubscription,
  ) {
    this.subscriptionService.on(this.conversationStartedSubscription);
  }
}
