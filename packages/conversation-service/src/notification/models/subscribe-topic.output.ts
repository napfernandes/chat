import { plainToInstance } from 'class-transformer';

export interface SubscribeTopicOutputAttributes {
  name: string;
}

export class SubscribeTopicOutput implements SubscribeTopicOutputAttributes {
  name: string;

  static from(attributes: Partial<SubscribeTopicOutputAttributes>): SubscribeTopicOutput {
    return plainToInstance(SubscribeTopicOutput, attributes);
  }
}
