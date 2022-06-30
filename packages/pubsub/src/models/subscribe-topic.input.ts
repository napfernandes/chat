import { plainToInstance } from 'class-transformer';

export class SubscribeTopicInput implements SubscribeTopicInput {
  topicName: string;
  endpoint?: string;

  static from(attributes: SubscribeTopicInput): SubscribeTopicInput {
    return plainToInstance(SubscribeTopicInput, attributes);
  }
}
