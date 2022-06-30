import * as http from 'http';
import { SQS } from 'aws-sdk';
import { Module } from '@nestjs/common';

import { QueueService } from './queue.service';

@Module({
  providers: [
    QueueService,
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
  ],
  exports: [QueueService],
})
export class QueueModule {}
