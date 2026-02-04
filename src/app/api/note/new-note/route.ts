import dbConnect from '@/app/connection/mongo.connection';
import { NoteModel } from '@/app/models/User';
import { createResponse } from '@/app/utils';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest): Promise<Response> {
  const { userId, title, content, active } = await request.json();
  console.log(`new note: ${userId}, ${title}, ${content}, ${active}`);

  try {
    await dbConnect();
    const newNote = new NoteModel({
      _userId: userId,
      title,
      content,
      active,
    });
    await newNote.save();
    return createResponse({
      data: newNote,
      code: 200,
      message: 'Note created successfully',
      isSuccess: true,
    });
  } catch (error) {
    console.error(error);
    return createResponse({
      data: null,
      code: 500,
      message: 'Internal Server Error.',
      isSuccess: false,
    });
  }
}
