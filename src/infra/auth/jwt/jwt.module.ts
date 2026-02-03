import { Module } from '@nestjs/common';
import { EncrypterRepository } from 'src/domain/encrypter/encrypter.repository';
import { JwtEncrypterService } from './jwt.encrypter.service';
import { JwtConfigModule } from './jwt.config.module';

@Module({
  imports: [JwtConfigModule],
  providers: [
    {
      provide: EncrypterRepository,
      useClass: JwtEncrypterService,
    },
  ],
  exports: [EncrypterRepository],
})
export class JwtModule {}
