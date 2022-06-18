import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.SERVER_PORT);

  console.log(`App started at http://localhost:${process.env.SERVER_PORT}`);
}
bootstrap();
