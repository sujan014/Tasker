import dbConnect from '@/app/connection/mongo.connection';
import { NoteModel } from '@/app/models/User';
import { createResponse } from '@/app/utils';
import { verifyJWT } from '@/app/utils/auth';
import { PayloadSignJWT } from '@/app/utils/types';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  //console.log('Get Notes');
  const token = request.cookies.get('token');
  //console.log(token);
  if (!token) {
    return createResponse({
      data: null,
      code: 401,
      message: 'Unauthorized',
      isSuccess: false,
    });
  }
  const decoded = await verifyJWT<PayloadSignJWT>(token.value);
  //console.log('decoded: ', decoded);

  await dbConnect();
  const notes = await NoteModel.find({ _userId: decoded?.userId });
  //console.log('get notes api: ', notes);
  return createResponse({
    data: notes,
    code: 200,
    message: 'notes found',
    isSuccess: true,
  });
}
