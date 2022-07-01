import { Module } from '@nestjs/common';

import { QueueModule } from '@napfernandes/queue';
import { SubscriptionService } from '@napfernandes/pubsub';

@Module({
  imports: [QueueModule],
  providers: [SubscriptionService],
})
export class SubscriptionModule {
  constructor(private readonly subscriptionService: SubscriptionService) {}
}
