import * as http from 'http';
import { SQS, SNS } from 'aws-sdk';
import { Module } from '@nestjs/common';

import { QueueService } from './queue.service';
import { PubsubService } from './pubsub.service';
import { SubscriptionService } from './subscription.service';

@Module({
  providers: [
    QueueService,
    PubsubService,
    SubscriptionService,
    {
      provide: 'Queue',
      useFactory: async () =>
        new SQS({
          apiVersion: '2012-11-05',
          region: process.env.AWS_REGION,
          endpoint: process.env.QUEUE_URL,
          httpOptions: { agent: new http.Agent({ keepAlive: true }) },
        }),
    },
    {
      provide: 'Pubsub',
      useFactory: async () =>
        new SNS({
          apiVersion: '2012-11-05',
          region: process.env.AWS_REGION,
          endpoint: process.env.PUBSUB_URL,
          httpOptions: { agent: new http.Agent({ keepAlive: true }) },
        }),
    },
  ],
  exports: [QueueService, PubsubService, SubscriptionService],
})
export class NotificationModule {}
