import * as http from 'http';
import { SQS } from 'aws-sdk';

import { Injectable } from '@nestjs/common';

import { ListQueueOutput } from './models/list-queue.output';
import { SendMessageToQueueInput } from './models/send-message-to-queue.input';
import { SendMessageToQueueOutput } from './models/send-message-to-queue.output';

@Injectable()
export class QueueService {
  sqsInstance: SQS;

  constructor() {
    this.sqsInstance = new SQS({
      apiVersion: '2012-11-05',
      region: process.env.AWS_REGION,
      endpoint: process.env.QUEUE_URL,
      httpOptions: {
        agent: new http.Agent({ keepAlive: true }),
      },
    });
  }

  get Instance() {
    return this.sqsInstance;
  }

  async getQueueByName(queueName: string): Promise<ListQueueOutput> {
    const existingQueue = await this.sqsInstance.getQueueUrl({ QueueName: queueName }).promise();

    return ListQueueOutput.from({ url: existingQueue.QueueUrl });
  }

  async createQueueByName(queueName: string): Promise<ListQueueOutput> {
    const createdQueue = await this.sqsInstance.createQueue({ QueueName: queueName }).promise();

    return ListQueueOutput.from({ url: createdQueue.QueueUrl });
  }

  async getOrCreateQueue(queueName: string): Promise<ListQueueOutput> {
    try {
      const existingQueue = await this.getQueueByName(queueName);

      return existingQueue;
    } catch (error) {
      return this.createQueueByName(queueName);
    }
  }

  async listAllQueues(): Promise<ListQueueOutput[]> {
    const queues = await this.sqsInstance.listQueues().promise();

    return queues.QueueUrls.map((queueUrl) => ({ url: queueUrl }));
  }

  buildQueueUrl(queueName: string): string {
    return `${process.env.QUEUE_URL}/${queueName}`;
  }

  async sendMessageToQueue<T>(
    params: SendMessageToQueueInput<T>,
  ): Promise<SendMessageToQueueOutput> {
    await this.getOrCreateQueue(params.queueName);
    const result = await this.sqsInstance
      .sendMessage({
        MessageGroupId: params.messageGroupId,
        QueueUrl: this.buildQueueUrl(params.queueName),
        MessageBody: JSON.stringify(params.messageBody),
        MessageDeduplicationId: params.messageDeduplicationId,
      })
      .promise();

    return SendMessageToQueueOutput.from({
      messageId: result.MessageId,
      sequenceNumber: result.SequenceNumber,
    });
  }
}
