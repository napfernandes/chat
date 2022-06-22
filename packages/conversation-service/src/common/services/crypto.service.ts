import { createHmac, randomBytes } from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoService {
  hashString(stringValue: string, saltValue: string): string {
    const hash = createHmac('sha256', saltValue);
    hash.update(stringValue);

    return hash.digest('hex');
  }

  createRandomString(numberOfBytes = 32): string {
    return randomBytes(Math.ceil(numberOfBytes / 2))
      .toString('hex')
      .slice(0, numberOfBytes);
  }
}
