import { plainToInstance } from 'class-transformer';

export class SubscribeTopicOutput {
  name: string;

  static from(attributes: SubscribeTopicOutput): SubscribeTopicOutput {
    return plainToInstance(SubscribeTopicOutput, attributes);
  }
}
