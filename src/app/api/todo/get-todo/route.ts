import dbConnect from '@/app/connection/mongo.connection';
import { TodoModel } from '@/app/models/User';
import { createResponse } from '@/app/utils';
import { verifyJWT } from '@/app/utils/auth';
import { Types } from 'mongoose';
import { NextRequest } from 'next/server';

interface DecodedUser {
  userId: string;
  email: string;
  authType: string;
}

export async function GET(request: NextRequest) {
  console.log('GET Todo');
  const token = request.cookies.get('token');
  console.log(token);
  if (!token) {
    return createResponse({
      data: null,
      code: 401,
      message: 'Unauthorized',
      isSuccess: false,
    });
  }
  const decoded = await verifyJWT<DecodedUser>(token.value);
  console.log('decoded: ', decoded);

  await dbConnect();
  const userCheck = new Types.ObjectId(decoded?.userId.toString());
  const _userId = decoded?.userId.toString();
  //console.log(`userCheck: ${userCheck}, type: ${typeof userCheck}`);
  console.log(
    `decoded user: ${decoded?.userId}, type: ${typeof decoded?.userId}`
  );
  const todos = await TodoModel.find({ _userId }); //.populate('_userId');
  console.log('get todos api: ', todos);

  return createResponse({
    data: todos, //decoded,
    code: 200,
    message: 'Unauthorized',
    isSuccess: true,
  });
}
