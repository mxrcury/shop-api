import crypto from 'crypto';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { ConfirmTokenModel } from '../models/confirmToken';
import { Tokens, UserPayload } from '../types/token';

class TokenService {
  async generateTokens(payload: UserPayload): Promise<Tokens> {
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);
    return {
      accessToken,
      refreshToken,
    };
  }

  async createConfirmToken(
    userId: string,
    expiringDate = Date.now() + 60 * 1000
  ): Promise<string> {
    const token = crypto.randomBytes(20).toString('hex');

    await ConfirmTokenModel.create({ userId, expiringDate, token });

    return token;
  }

  generateAccessToken(payload: UserPayload): string {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
  }

  generateRefreshToken(payload: UserPayload): string {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '30d' });
  }

  validateToken(token: string): string | JwtPayload {
    return jwt.verify(token, process.env.SECRET_KEY);
  }
}
export default new TokenService();
