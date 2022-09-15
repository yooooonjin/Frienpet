import jwt from 'jsonwebtoken';
import { Request } from 'express';

const getUserIdFromRequest = (req: Request): string | null => {
  const token = extractTokenFromRequest(req);
  if (!token) return null;
  const jwtPayload = decodeJWT(token);
  return (jwtPayload as any)?.email || null;
};

const extractTokenFromRequest = (req: Request): string | undefined => {
  const TOKEN_PREFIX = 'Bearer';
  const auth = req.headers.authorization;
  const token = auth?.includes(TOKEN_PREFIX)
    ? auth.split(TOKEN_PREFIX)[1]
    : auth;
  return token;
};

const decodeJWT = (token: string) => {
  const TOKEN_KEY = process.env.JWT_SECRET!;
  try {
    const decodedToken = jwt.verify(token, 'TOKEN_KEY');
    return decodedToken;
  } catch {
    return null;
  }
};

export const createJWT = async (email: string) => {
  const TOKEN_KEY = process.env.JWT_SECRET!;
  const token = jwt.sign({ email }, 'TOKEN_KEY', {
    expiresIn: '24h',
  });
  return token;
};

export default getUserIdFromRequest;
