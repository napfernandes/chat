import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

import { LoginTokenInput } from '../models/login-token.input';

@Injectable()
export class TokenService {
  generateLoginToken(input: LoginTokenInput): string {
    return jwt.sign(input, process.env.JWT_SECRET);
  }
}
