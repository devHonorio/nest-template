import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secretKey = config.get<string>('auth.secret');
        return { secret: secretKey };
      },
    }),
  ],
  exports: [JwtModule],
})
export class JwtConfigModule {}
