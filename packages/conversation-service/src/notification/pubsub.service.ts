import { SNS } from 'aws-sdk';
import { Injectable } from '@nestjs/common';

import { QueueService } from './queue.service';
import { CreateTopicInput } from './models/create-topic.input';
import { CreateTopicOutput } from './models/create-topic.output';
import { SubscribeTopicInput } from './models/subscribe-topic.input';
import { SubscribeTopicOutput } from './models/subscribe-topic.output';

@Injectable()
export class PubsubService {
  private readonly snsInstance: SNS;

  constructor(private readonly queueService: QueueService) {
    const awsConfiguration = {
      apiVersion: '2012-11-05',
      region: process.env.AWS_REGION,
    };

    this.snsInstance = new SNS({ ...awsConfiguration, endpoint: process.env.PUBSUB_URL });
  }

  async createTopic(input: CreateTopicInput): Promise<CreateTopicOutput> {
    const topic = await this.snsInstance
      .createTopic({
        Name: input.name,
        Tags: input.tags.map((tag) => ({ Key: tag.key, Value: tag.value })),
      })
      .promise();

    return CreateTopicOutput.from({ name: topic.TopicArn });
  }

  async subscribeTopic(input: SubscribeTopicInput): Promise<SubscribeTopicOutput> {
    const queue = await this.queueService.getQueueByName(input.topicName);
    const subscription = await this.snsInstance
      .subscribe({ TopicArn: input.topicName, Endpoint: queue.url, Protocol: 'sqs' })
      .promise();

    return SubscribeTopicOutput.from({ name: subscription.SubscriptionArn });
  }
}
