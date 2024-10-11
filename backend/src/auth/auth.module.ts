import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SpotifyStrategy } from './spotify.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'spotify' }),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, SpotifyStrategy],
  exports: [AuthService],
})
export class AuthModule {}
