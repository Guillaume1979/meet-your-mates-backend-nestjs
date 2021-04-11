import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get('DB_TYPE'),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [],
          autoLoadEntities: true,
          synchronize: configService.get('DB_SYNCHRONIZE'),
          dropSchema: configService.get('DB_DROPSCHEMA'),
        } as TypeOrmModuleAsyncOptions),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
