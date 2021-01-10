import { Global, Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Global()
@Module({
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
