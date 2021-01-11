import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from './player/player.module';
import { GuildModule } from './guild/guild.module';
import { PlayerEntity } from './player/entities/player.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'coucou',
      database: 'meet_your_mates',
      entities: [PlayerEntity],
      autoLoadEntities: false,
      synchronize: true,
    }),
    PlayerModule,
    GuildModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
