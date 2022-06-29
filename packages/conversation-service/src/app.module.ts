import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AuthModule } from './auth/auth.module';
import { ConversationModule } from './conversation.module';
import { NotificationModule } from './notification/notification.module';
import { SubscriptionModule } from './subscriptions/subscription.module';
import { CustomMongoDBLogger } from './common/custom/custom-mongodb-logger';

@Module({
  imports: [
    AuthModule,
    NotificationModule,
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
