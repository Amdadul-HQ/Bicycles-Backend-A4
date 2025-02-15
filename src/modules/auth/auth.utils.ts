import jwt from 'jsonwebtoken';
import ms from 'ms'

export const createToken = (
    jwtPayload: Record<string, unknown>,
    secret: string,
    expiresIn: string | number
): string => {
    return jwt.sign(jwtPayload, secret, {
      expiresIn: Math.floor(ms(expiresIn as ms.StringValue) / 1000)
    });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};