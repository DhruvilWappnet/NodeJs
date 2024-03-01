import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './user/exception.filter';
import { AllExceptionsFilter } from './user/all-exceptions.filter';
import { customvalidatiopipe } from './user/validation.pipe';
import { RolesGuard } from './roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  app.useGlobalFilters(new CustomExceptionFilter());
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  // app.useGlobalPipes(new customvalidatiopipe());
  // app.useGlobalGuards(new RolesGuard(app.get(Reflector)));
  await app.listen(3000);
}
bootstrap();
