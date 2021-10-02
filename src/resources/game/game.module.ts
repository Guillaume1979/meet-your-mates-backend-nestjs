import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Cover } from './entities/cover.entity';
import { GameController } from './game.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Cover])],
  providers: [GameService],
  controllers: [GameController],
})
export class GameModule {}
