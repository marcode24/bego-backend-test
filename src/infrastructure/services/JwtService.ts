import EnvConfig from 'application/config/EnvConfig.ts';
import { IJwtService } from 'domain/services/IJwtService.ts';
import jwt from 'jsonwebtoken';
import { injectable } from 'tsyringe';

@injectable()
export class JwtService implements IJwtService {
  private readonly envConfig = new EnvConfig();
  private readonly secret: string = this.envConfig.env.JWT_SECRET;
  private readonly expiresIn: string = this.envConfig.env.JWT_EXPIRES_IN;
  private readonly issuer: string = this.envConfig.env.JWT_ISSUER;

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
      return null;
    }
  }
}
