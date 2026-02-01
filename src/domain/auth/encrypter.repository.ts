export abstract class EncrypterRepository {
  abstract generateToken(userId: string, expiresIn?: number): Promise<string>;
  abstract verifyToken(token: string): Promise<{ userId: string }>;
}
