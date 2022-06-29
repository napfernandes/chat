import { Module } from '@nestjs/common';

import { QueueService } from './queue.service';
import { PubsubService } from './pubsub.service';
import { SubscriptionService } from './subscription.service';

@Module({
  providers: [QueueService, PubsubService, SubscriptionService],
  exports: [QueueService, PubsubService, SubscriptionService],
})
export class NotificationModule {}
