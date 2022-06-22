import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.SERVER_PORT);

  const appUrl = await app.getUrl();

  console.log(`Conversation service started at ${appUrl}.`);
  console.log(`Conversation service playground started at ${appUrl}/graphql.`);
}
bootstrap();
