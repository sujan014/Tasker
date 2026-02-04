import { createResponse } from '@/app/utils';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    (await cookies()).set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 0,
    });
    return createResponse({
      data: null,
      code: 200,
      message: 'Logged out Successfully',
      isSuccess: true,
    });
  } catch (error) {
    console.log('logout error: ', error);
    return createResponse({
      data: null,
      code: 400,
      message: 'Error in logout',
      isSuccess: false,
    });
  }
}

// (await cookies()).set('token', token, {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === 'production',
//   sameSite: 'strict',
//   path: '/',
//   maxAge: 12 * 60 * 60,
// });
