import {
  HttpAdapterHost,
  LazyModuleLoader,
  NestFactory,
  Reflector,
} from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './user/exception.filter';
import { AllExceptionsFilter } from './user/all-exceptions.filter';
import { customvalidatiopipe } from './user/validation.pipe';
import { RolesGuard } from './roles.guard';
import { NewUserInterceptor } from './user/user.interceptor';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: true,
    }),
  );

  app.useGlobalFilters(new CustomExceptionFilter());
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: false }));
  // app.useGlobalPipes(new customvalidatiopipe());
  // app.useGlobalGuards(new RolesGuard(app.get(Reflector)));
  // app.useGlobalInterceptors(new NewUserInterceptor());
  const configService = app.get(ConfigService);
  const port = configService.get('APP_PORT');
  const lazyModuleLoader = app.get<number>(LazyModuleLoader);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  app.enableShutdownHooks();
  // setTimeout(() => {
  //   app.close();
  // }, 3000);
}
bootstrap();
