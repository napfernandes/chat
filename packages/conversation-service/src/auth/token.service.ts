import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  decodeToken(tokenString: string): unknown {
    return this.jwtService.decode(tokenString, { complete: true, json: true });
  }
}
