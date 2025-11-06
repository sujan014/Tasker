import { createResponse } from '@/app/utils';
import { verifyJWT } from '@/app/utils/auth';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token');
  if (!token) {
    return createResponse({
      data: { isAuthenticated: false },
      code: 401,
      message: 'Unauthorized',
      isSuccess: false,
    });
  }
  try {
    const decoded = await verifyJWT(token.value);
    return createResponse({
      data: { isAuthenticated: true, user: decoded },
      code: 200,
      message: 'Authentication successful',
      isSuccess: true,
    });
  } catch {
    return createResponse({
      data: { isAuthenticated: false },
      code: 401,
      message: 'Unauthorized',
      isSuccess: false,
    });
  }
}
