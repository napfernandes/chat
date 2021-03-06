import { plainToInstance } from 'class-transformer';

export class CreateTopicOutput {
  name: string;

  static from(attributes: CreateTopicOutput): CreateTopicOutput {
    return plainToInstance(CreateTopicOutput, attributes);
  }
}
