import { join } from 'path';
import { Connection } from 'mongoose';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule, InjectConnection } from '@nestjs/mongoose';

import { UserModule } from './user.module';
import { SubscriptionModule } from './subscriptions/subscription.module';
import { CustomMongoDBLogger } from './common/custom/custom-mongodb-logger';

@Module({
  imports: [
    UserModule,
    SubscriptionModule,
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
    this.connection.set('debug', true);
  }
}
