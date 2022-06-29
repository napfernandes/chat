import { plainToInstance } from 'class-transformer';

export interface SubscribeTopicInputAttributes {
  topicName: string;
  endpoint?: string;
}

export class SubscribeTopicInput implements SubscribeTopicInputAttributes {
  topicName: string;
  endpoint?: string;

  static from(attributes: Partial<SubscribeTopicInputAttributes>): SubscribeTopicInput {
    return plainToInstance(SubscribeTopicInput, attributes);
  }
}
