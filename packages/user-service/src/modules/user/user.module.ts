import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User, UserSchema } from './user.schema';
import { UserRepository } from './user.repository';
import { TokenService } from 'src/common/services/token.service';
import { CryptoService } from 'src/common/services/crypto.service';
import { ValidatorService } from 'src/common/services/validator.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [
    UserService,
    UserResolver,
    UserRepository,
    TokenService,
    CryptoService,
    ValidatorService,
  ],
})
export class UserModule {}
