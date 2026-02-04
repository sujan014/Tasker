import dbConnect from '@/app/connection/mongo.connection';
import { NoteModel } from '@/app/models/User';
import { createResponse } from '@/app/utils';

export async function POST(request: Request): Promise<Response> {
  const { _id, ...noteContent } = await request.json();

  try {
    await dbConnect();
    const note = await NoteModel.findByIdAndUpdate(_id, noteContent, {
      new: true,
    });
    //console.log(note);
    return createResponse({
      data: note,
      code: 200,
      message: 'Note edited',
      isSuccess: true,
    });
  } catch (error) {
    return createResponse({
      data: null,
      code: 500,
      message: 'Internal Server Error.',
      isSuccess: false,
    });
  }
}
