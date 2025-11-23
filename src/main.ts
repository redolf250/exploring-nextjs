import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { HttpExceptionFilter } from './commons/exceptions/HttpExceptionFilter';
import { DatabaseExceptionFilter } from './commons/exceptions/DatabaseExceptionFilter';
dotenv.config();

declare global {
  interface Request {
    rawBody?: Buffer;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalFilters(new DatabaseExceptionFilter())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // strip unknown properties
      forbidNonWhitelisted: true, // throw error for unknown properties
      transform: true,        // auto-transform to DTO class instance
    }),
    //app.useGlobalInterceptors(new Interceptor())
  );
  app.use(express.json({
    verify: (req: any, res, buf) => {
      req.rawBody = buf; // store raw bytes
    },
  }),)

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
