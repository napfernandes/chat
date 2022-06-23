import { plainToInstance } from 'class-transformer';

export interface CurrentUserTokenAttributes {
  email: string;
  userId: string;
}

export class CurrentUserToken implements CurrentUserTokenAttributes {
  email: string;
  userId: string;

  static from(attributes: Partial<CurrentUserTokenAttributes>): CurrentUserToken {
    return plainToInstance(CurrentUserToken, attributes);
  }
}
