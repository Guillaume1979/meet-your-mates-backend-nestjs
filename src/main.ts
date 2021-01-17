import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('APP_PORT');
  app.use(morgan('dev'));
  app.use(helmet());
  app.enableCors({
    origin: ['http://localhost:4200'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      // transform the data type to correspond with the entities type
      transform: true,
      // suppress all attributes in the Json which doesn't correspond to my entities attributes
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(port);
  console.log(`Server started on port : ${port}`);
}
bootstrap();
