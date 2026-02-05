import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/User';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(user: User) {
    const createdUser = await this.userRepository.create(user);

    if (!createdUser) {
      throw new BadRequestException('Dados inválidos para criação de usuário.');
    }
    return createdUser;
  }

  async deleteUserById(id: string) {
    return await this.userRepository.deleteById(id);
  }

  async findUserById(id: string) {
    return await this.userRepository.findById(id);
  }
}
