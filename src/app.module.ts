import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ResourcesModule } from './resources/resources.module';

const environment =
  process.env.ENVIRONMENT === 'prod' ? '.env.prod' : '.env.dev';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', environment],
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    ResourcesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [ConfigModule],
})
export class AppModule {}
