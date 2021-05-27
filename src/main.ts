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
  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.ENVIRONMENT === 'dev' ? false : undefined,
    }),
  );

  // app.use((req, res, next) => {
  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   res.header(
  //     'Access-Control-Allow-Headers',
  //     'Origin, X-Requested-With, Content-Type, Accept',
  //   );
  //   next();
  // });

  app.enableCors({
    origin: [
      'http://localhost:4200',
      // 'http://localhost:3000',
      // 'https://discord.com/api/oauth2/authorize',
    ],
    // allowedHeaders: [
    //   // 'Content-Type, Authorization, X-Track, X-Super-Properties, X-Context-Properties, X-Failed-Requests, X-Fingerprint, X-RPC-Proxy, X-Debug-Options, x-client-trace-id, If-None-Match, Range, X-RateLimit-Precision',
    //   'Access-Control-Allow-Origin',
    //   'Access-Control-Allow-Headers',
    //   'application/json, text/plain, */*',
    // ],
    // exposedHeaders: [
    //   'Access-Control-Allow-Origin',
    //   'Access-Control-Allow-Headers',
    // ],
    // credentials: true,
    // preflightContinue: true,
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
  app.setGlobalPrefix('api');
  await app.listen(port);
  console.log(`Server started on port : ${port}`);
}
bootstrap();
