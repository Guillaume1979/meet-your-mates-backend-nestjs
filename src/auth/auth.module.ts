import { HttpModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../resources/player/entities/player.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './utils/constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '43200s' }, //12 hours
    }),
    HttpModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    // todo : to activate
    // to provide JWT Guard globally
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
