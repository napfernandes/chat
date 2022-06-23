import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './jwt.strategy';
import { TokenService } from './token.service';

@Module({
  imports: [PassportModule, JwtModule.register({ secret: process.env.JWT_SECRET })],
  providers: [TokenService, JwtStrategy],
  exports: [TokenService],
})
export class AuthModule {}
