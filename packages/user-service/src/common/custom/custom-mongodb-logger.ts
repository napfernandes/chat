import { Logger } from 'mongodb';

export const CustomMongoDBLogger = new Logger('MongoDB Driver', {
  logger: console.log,
});
