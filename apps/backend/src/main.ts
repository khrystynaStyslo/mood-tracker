import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SerializerInterceptor } from "./common/interceptors/serializer.interceptor";
import {ValidationPipe} from "@nestjs/common";
import {AllExceptionsFilter} from "./common/filters/all-exceptions.filter";
import {LoggingInterceptor} from "./common/interceptors/logging.interceptor";
import {ConfigService} from "@nestjs/config";
import {EnvConfig} from "./config/env.interface";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService<EnvConfig>>(ConfigService);

  app.useGlobalInterceptors(new SerializerInterceptor());
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
      }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(config.get('PORT'));
}

bootstrap();
