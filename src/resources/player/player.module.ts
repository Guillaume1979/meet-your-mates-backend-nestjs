import { Global, Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../auth/utils/constants';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Player]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '43200s' }, //12 hours
    }),
  ],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports: [],
})
export class PlayerModule {}
