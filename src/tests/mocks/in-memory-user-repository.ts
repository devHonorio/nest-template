import { User } from 'src/domain/users/entities/User';
import { UserRepository } from 'src/domain/users/user.repository';

export class InMemoryUserRepository extends UserRepository {
  public users: User[] = [];

  create(user: User): Promise<User | null> {
    this.users.push(user);
    return Promise.resolve(user);
  }

  deleteById(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
    return Promise.resolve();
  }

  findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id) || null;
    return Promise.resolve(user);
  }
}
