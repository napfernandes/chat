import { join } from 'path';
import { Connection } from 'mongoose';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule, InjectConnection } from '@nestjs/mongoose';

import { UserModule } from './modules/user/user.module';
import { CustomMongoDBLogger } from './common/custom';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      logger: CustomMongoDBLogger,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
    }),
  ],
})
export class AppModule {
  constructor(@InjectConnection() private readonly connection: Connection) {
    connection.set('debug', true);
  }
}
