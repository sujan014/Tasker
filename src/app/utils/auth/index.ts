import { cookies } from 'next/headers';
import { PayloadSignJWT } from '../types';
import { jwtVerify, SignJWT } from 'jose';

export const signJWT = async (
  payload: PayloadSignJWT,
  option: { exp: string }
) => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const alg = 'HS256';
    return new SignJWT({ ...payload })
      .setProtectedHeader({ alg })
      .setExpirationTime(option.exp)
      .setIssuedAt()
      .setSubject(payload.userId)
      .sign(secret);
  } catch (error) {
    throw error;
  }
};

export const verifyJWT = async <T>(token: string) => {
  try {
    return (
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET_KEY)
      )
    ).payload as T;
  } catch (error) {
    return null;
  }
};

export const generateTokenAndSaveCookie = async ({
  userId,
  email,
  authType = 'email',
}: PayloadSignJWT): Promise<PayloadSignJWT> => {
  const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '12h';
  const payload: PayloadSignJWT = { userId, email, authType };

  const token = await signJWT(payload, { exp: JWT_EXPIRES_IN });

  (await cookies()).set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 12 * 60 * 60,
  });

  return {
    userId,
    email,
    authType,
  };
};
