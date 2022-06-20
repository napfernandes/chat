import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { CustomMongoDBLogger } from './common/mongoose/custom-mongodb-logger';

@Module({
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      logger: CustomMongoDBLogger,
    }),
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(@InjectConnection() private readonly connection: Connection) {
    connection.set('debug', true);
  }
}
