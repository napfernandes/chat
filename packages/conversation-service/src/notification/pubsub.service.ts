import { SNS } from 'aws-sdk';
import { Inject, Injectable } from '@nestjs/common';

import { CreateTopicInput } from './models/create-topic.input';
import { CreateTopicOutput } from './models/create-topic.output';

@Injectable()
export class PubsubService {
  constructor(@Inject('Pubsub') private readonly pubsub: SNS) {}

  async createTopic(input: CreateTopicInput): Promise<CreateTopicOutput> {
    const topic = await this.pubsub
      .createTopic({
        Name: input.name,
        Tags: input.tags.map((tag) => ({ Key: tag.key, Value: tag.value })),
      })
      .promise();

    return CreateTopicOutput.from({ name: topic.TopicArn });
  }
}
