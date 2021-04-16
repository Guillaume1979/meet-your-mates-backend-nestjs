import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameResolver } from './game.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Cover } from './entities/cover.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Cover])],
  providers: [GameResolver, GameService],
})
export class GameModule {}
