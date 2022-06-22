import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService {
  decodeToken(tokenString: string): unknown {
    return jwt.decode(tokenString, { complete: true, json: true });
  }
}
