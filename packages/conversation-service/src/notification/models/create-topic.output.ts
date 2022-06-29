import { plainToInstance } from 'class-transformer';

export interface CreateTopicOutputAttributes {
  name: string;
}

export class CreateTopicOutput implements CreateTopicOutputAttributes {
  name: string;

  static from(attributes: Partial<CreateTopicOutputAttributes>): CreateTopicOutput {
    return plainToInstance(CreateTopicOutput, attributes);
  }
}
