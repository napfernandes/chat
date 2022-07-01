import { Module } from '@nestjs/common';

import { UserModule } from '../user.module';
import { QueueModule } from '@napfernandes/queue';
import { SubscriptionService } from '@napfernandes/pubsub';
import { ConversationStartedSubscription } from './conversation-started/conversation-started.subscription';

@Module({
  imports: [UserModule, QueueModule],
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
