import dbConnect from '@/app/connection/mongo.connection';
import { NoteModel } from '@/app/models/User';
import { createResponse } from '@/app/utils';

export async function POST(request: Request): Promise<Response> {
  const { _id, _userId, title, content, active } = await request.json();
  console.log(`id to delete: ${_id}`);

  //const note = await request.json();
  //console.table(note);

  try {
    await dbConnect();
    const deleteNote = await NoteModel.findOneAndDelete({ _id });
    console.log('deleted note: ');
    console.table(deleteNote);
    return createResponse({
      data: deleteNote,
      code: 200,
      message: 'Note deleted',
      isSuccess: true,
    });
  } catch (error) {
    return createResponse({
      data: null,
      code: 500,
      message: 'Note could not be deleted',
      isSuccess: false,
    });
  }
}
