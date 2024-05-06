import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const app = await NestFactory.create(AppModule, {
  // logger: new Logger(),
  // });
  // app.useLogger(new Logger('global'));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
