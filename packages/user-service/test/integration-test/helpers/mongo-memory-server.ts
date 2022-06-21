import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

export function getMongoMemoryServer() {
  return MongoMemoryServer.create();
}

export function getMongooseTestModule(
  server: MongoMemoryServer,
  options: MongooseModuleOptions = {},
) {
  return MongooseModule.forRootAsync({
    useFactory: async () => {
      const mongoUri = await server.getUri();

      return { uri: mongoUri, ...options };
    },
  });
}

export async function closeMongoMemoryServer(server: MongoMemoryServer): Promise<boolean> {
  return server.stop();
}
