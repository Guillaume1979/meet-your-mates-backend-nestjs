import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { LoggingInterceptor } from './middleware/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('APP_PORT');

  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.ENVIRONMENT === 'dev' ? false : undefined,
    }),
  );

  app.enableCors({
    origin: ['http://localhost:4200'],
  });

  app.useGlobalInterceptors(new LoggingInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      // transform the data type to correspond with the entities type
      transform: true,
      // suppress all attributes in the Json which doesn't correspond to my entities attributes
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );
  app.setGlobalPrefix('api');
  await app.listen(port);
  console.log(`Server started on port : ${port}`);
}

bootstrap();
