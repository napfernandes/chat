import { plainToInstance } from 'class-transformer';

export class SubscribeTopicOutput {
  name: string;

  static from(attributes: Partial<SubscribeTopicOutput>): SubscribeTopicOutput {
    return plainToInstance(SubscribeTopicOutput, attributes);
  }
}
