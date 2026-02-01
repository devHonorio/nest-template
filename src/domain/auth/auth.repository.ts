export abstract class AuthRepository {
  abstract deleteTokenAndUserByUserId(userId: string): Promise<void>;
}
