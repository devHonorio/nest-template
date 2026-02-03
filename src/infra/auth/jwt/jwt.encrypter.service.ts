import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncrypterRepository } from 'src/domain/encrypter/encrypter.repository';

@Injectable()
export class JwtEncrypterService extends EncrypterRepository {
  constructor(private jwtService: JwtService) {
    super();
  }

  async generateToken(
    userId: string,
    expiresInSeconds?: number,
  ): Promise<string> {
    const payload = { sub: userId };

    const options = expiresInSeconds
      ? { expiresIn: expiresInSeconds, secret: process.env.SECRET_JWT_KEY }
      : undefined;
    return await this.jwtService.signAsync(payload, options);
  }
}
