import { SubscriptionMessage, SubscriptionService } from '../notification/subscription.service';

export abstract class BaseSubscription<T> {
  constructor(protected readonly subscriptionService: SubscriptionService) {}

  abstract get topicName(): string;
  abstract onSubscribe(message: SubscriptionMessage<T>): Promise<void>;
}
