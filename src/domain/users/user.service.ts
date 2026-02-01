import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/User';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(user: User) {
    try {
      return await this.userRepository.create(user);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new ServiceUnavailableException(
        'Erro ao fazer cadastro de usuário.',
      );
    }
  }

  async deleteUserById(id: string) {
    return await this.userRepository.deleteById(id);
  }

  async findUserById(id: string) {
    return await this.userRepository.findById(id);
  }
}
