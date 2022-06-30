import * as http from 'http';
import { SNS } from 'aws-sdk';
import { Module } from '@nestjs/common';

import { PubsubService } from './pubsub.service';
import { SubscriptionService } from './subscription.service';
import { QueueModule } from '@napfernandes/queue';

@Module({
  imports: [QueueModule],
  providers: [
    PubsubService,
    SubscriptionService,
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
  exports: [PubsubService, SubscriptionService],
})
export class PubsubModule {}
