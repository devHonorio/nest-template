import { Injectable } from '@nestjs/common';
import { EncrypterRepository } from './encrypter.repository';

@Injectable()
export class EncrypterService {
  constructor(private encrypterRepository: EncrypterRepository) {}

  async generateToken(userId: string, expiresIn?: number): Promise<string> {
    return this.encrypterRepository.generateToken(userId, expiresIn);
  }
}
