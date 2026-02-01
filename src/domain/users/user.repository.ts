import { User } from './entities/User';

export abstract class UserRepository {
  abstract create(user: User): Promise<User | null>;
  abstract deleteById(id: string): Promise<void>;
  abstract findById(id: string): Promise<User | null>;
}
