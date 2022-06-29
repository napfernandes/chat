import { Module } from '@nestjs/common';
import { NotificationModule } from '../notification/notification.module';

import { SubscriptionService } from '../notification/subscription.service';
import { ConversationStartedSubscription } from './conversation-started.subscription';

@Module({
  imports: [NotificationModule],
  providers: [SubscriptionService, ConversationStartedSubscription],
})
export class SubscriptionModule {
  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly conversationStartedSubscription: ConversationStartedSubscription,
  ) {
    this.subscriptionService.on(
      this.conversationStartedSubscription.topicName,
      this.conversationStartedSubscription.onSubscribe,
    );
  }
}
