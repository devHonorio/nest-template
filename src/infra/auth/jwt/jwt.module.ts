import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EncrypterRepository } from 'src/domain/auth/encrypter.repository';
import { JwtEncrypterRepository } from './encrypter/encrypter.service';
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
  providers: [
    { provide: EncrypterRepository, useClass: JwtEncrypterRepository },
  ],
  exports: [EncrypterRepository],
})
export class JwtNestModule {}
