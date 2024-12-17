import jwt from 'jsonwebtoken';
import { injectable } from 'tsyringe';

@injectable()
export class JwtService {
  private readonly secret: string;
  private readonly expiresIn: string;
  private readonly issuer: string;

  constructor(secret: string, expiresIn: string, issuer: string) {
    this.secret = secret;
    this.expiresIn = expiresIn;
    this.issuer = issuer;
  }

  public generateToken(payload: Record<string, unknown>): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn,
      issuer: this.issuer,
    });
  }

  public verifyToken(token: string): Record<string, unknown> {
    try {
      return jwt.verify(token, this.secret, {
        issuer: this.issuer,
      }) as Record<string, unknown>;
    } catch {
      throw new Error('Invalid token');
    }
  }
}
