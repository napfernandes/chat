import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AuthModule } from './auth/auth.module';
import { QueueModule } from '@napfernandes/queue';
import { PubsubModule } from '@napfernandes/pubsub';
import { ConversationModule } from './conversation.module';
import { SubscriptionModule } from './subscriptions/subscription.module';
import { CustomMongoDBLogger } from './common/custom/custom-mongodb-logger';

@Module({
  imports: [
    AuthModule,
    QueueModule,
    PubsubModule,
    ConversationModule,
    SubscriptionModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      logger: CustomMongoDBLogger,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      playground: true,
      context: ({ req, res }) => ({ req, res }),
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
    }),
  ],
})
export class AppModule {}
