import { MongoMemoryServer } from 'mongodb-memory-server';
import {
  getMongoMemoryServer,
  getMongooseTestModule,
  closeMongoMemoryServer,
} from './mongo-memory-server';

let mongoMemoryServer: MongoMemoryServer;

beforeAll(async () => {
  mongoMemoryServer = await getMongoMemoryServer();
  global.MongooseTestModule = getMongooseTestModule(mongoMemoryServer);
});

afterAll(async () => {
  await closeMongoMemoryServer(mongoMemoryServer);
});
